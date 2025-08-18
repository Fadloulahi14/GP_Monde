<?php 
$pageTitle = "Suivi de Colis";
$pageSubtitle = "Suivez votre colis en temps réel";
?>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Suivi de Colis</h2>
            <p class="text-gray-600">Entrez votre code de suivi pour voir l'état de votre colis</p>
        </div>
        
        <form id="suivi-form" class="mb-8" action="?page=suivi-colis" method="GET">
            <div class="flex gap-4">
                <input type="text" 
                       id="code-suivi" 
                       name="codeSuivi"
                       placeholder="Ex: AB123456" 
                       class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       required
                       maxlength="8"
                       pattern="[A-Z]{2}[0-9]{6}">
                <button type="submit" 
                        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i data-feather="search" class="w-4 h-4 inline mr-2"></i>
                    Rechercher
                </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">Format: 2 lettres suivies de 6 chiffres</p>
        </form>
        
        <div id="loading" class="hidden text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-600">Recherche en cours...</p>
        </div>
        
        <div id="results" class="hidden">
            <div id="colis-info" class="bg-blue-50 rounded-lg p-6 mb-6">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">Informations du Colis</h3>
                        <p class="text-sm text-gray-600">Code de suivi: <span id="code-display" class="font-mono font-semibold"></span></p>
                    </div>
                    <span id="etat-badge" class="px-3 py-1 rounded-full text-sm font-semibold"></span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Expéditeur</p>
                        <p id="expediteur" class="font-medium"></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Destinataire</p>
                        <p id="destinataire" class="font-medium"></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Poids</p>
                        <p id="poids" class="font-medium"></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Type de produit</p>
                        <p id="type-produit" class="font-medium"></p>
                    </div>
                </div>
            </div>
            
            <div id="trajet-info" class="bg-green-50 rounded-lg p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Informations du Trajet</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Départ</p>
                        <p id="lieu-depart" class="font-medium"></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Arrivée</p>
                        <p id="lieu-arrivee" class="font-medium"></p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Distance</p>
                        <p id="distance" class="font-medium"></p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <div id="map-container" class="rounded-lg border border-gray-200 shadow-sm" style="height: 400px;">
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Historique du Colis</h3>
                <div id="timeline" class="space-y-4">
                </div>
            </div>
        </div>
        
        <div id="not-found" class="hidden text-center py-8">
            <div class="text-red-500 mb-4">
                <i data-feather="alert-circle" class="w-12 h-12 mx-auto mb-2"></i>
                <h3 class="text-lg font-semibold">Colis non trouvé</h3>
                <p>Aucun colis correspondant à ce code de suivi n'a été trouvé.</p>
                <p class="text-sm mt-2">Vérifiez le code et réessayez.</p>
            </div>
        </div>
    </div>
</div>

<script type="module">
import { ColisService } from "../dist/services/ColisService.js";

const colisService = new ColisService('http://localhost:3000');

function getEtatClass(etat) {
    const classes = {
        'en_attente': 'bg-yellow-100 text-yellow-800',
        'en_cours': 'bg-blue-100 text-blue-800',
        'arriver': 'bg-green-100 text-green-800',
        'recuperer': 'bg-purple-100 text-purple-800',
        'perdu': 'bg-red-100 text-red-800',
        'annuler': 'bg-orange-100 text-orange-800',
        'archiver': 'bg-gray-100 text-gray-800'
    };
    return classes[etat] || classes.en_attente;
}

function getEtatLabel(etat) {
    const labels = {
        'en_attente': 'En Attente',
        'en_cours': 'En Cours',
        'arriver': 'Arrivé',
        'recuperer': 'Récupéré',
        'perdu': 'Perdu',
        'annuler': 'Annulé',
        'archiver': 'Archivé'
    };
    return labels[etat] || etat;
}

function afficherColis(colis, cargaison) {
    document.getElementById('code-display').textContent = colis.code_suivi || 'N/A';
    document.getElementById('expediteur').textContent = colis.expediteur || 'Non renseigné';
    document.getElementById('destinataire').textContent = colis.destinataire || 'Non renseigné';
    document.getElementById('poids').textContent = `${colis.Poids || 0} kg`;
    document.getElementById('type-produit').textContent = colis.Type_cargaison || 'Non spécifié';
    
    const etatBadge = document.getElementById('etat-badge');
    etatBadge.textContent = getEtatLabel(colis.etat);
    etatBadge.className = `px-3 py-1 rounded-full text-sm font-semibold ${getEtatClass(colis.etat)}`;
    
    if (cargaison && cargaison.trajet) {
        const trajet = cargaison.trajet;
        document.getElementById('lieu-depart').textContent = trajet?.depart?.ville || 'Non défini';
        document.getElementById('lieu-arrivee').textContent = trajet?.arrivee?.ville || 'Non défini';
        document.getElementById('distance').textContent = `${cargaison.distance || 0} km`;
        
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.height = '400px';
        
        const coordonnees = {
            'Dakar': [14.6937, -17.4441],
            'Saint-Louis': [16.0326, -16.4818],
            'Paris': [48.8566, 2.3522],
            'MBORO': [15.1338, -16.8870]
        };

        const departCoords = coordonnees[trajet.depart.ville] || [14.6937, -17.4441]; // Dakar par défaut
        const arriveeCoords = coordonnees[trajet.arrivee.ville] || [16.0326, -16.4818]; // Saint-Louis par défaut

        mapContainer.innerHTML = ''; // Nettoyer le conteneur
        const map = L.map(mapContainer).setView([
            (departCoords[0] + arriveeCoords[0]) / 2,
            (departCoords[1] + arriveeCoords[1]) / 2
        ], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker(departCoords)
            .bindPopup(`<b>Départ</b><br>${trajet.depart.ville}`)
            .addTo(map);

        L.marker(arriveeCoords)
            .bindPopup(`<b>Arrivée</b><br>${trajet.arrivee.ville}`)
            .addTo(map);

        L.polyline([departCoords, arriveeCoords], {
            color: 'blue',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10'
        }).addTo(map);

        // Ajuster la vue pour voir tout le trajet
        map.fitBounds([departCoords, arriveeCoords], {
            padding: [50, 50]
        });
    }
    
    // Timeline simplifiée
    const timeline = document.getElementById('timeline');
    const etats = ['en_attente', 'en_cours', 'arriver', 'recuperer'];
    const etatActuel = colis.etat;
    const indexActuel = etats.indexOf(etatActuel);
    
    timeline.innerHTML = etats.map((etat, index) => {
        const isActive = index <= indexActuel;
        const isCurrent = etat === etatActuel;
        
        return `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                }">
                    ${isActive ? '✓' : index + 1}
                </div>
                <div class="flex-1">
                    <p class="font-medium ${isCurrent ? 'text-blue-600' : isActive ? 'text-green-600' : 'text-gray-500'}">
                        ${getEtatLabel(etat)}
                    </p>
                    ${isCurrent ? '<p class="text-sm text-blue-600">État actuel</p>' : ''}
                </div>
            </div>
        `;
    }).join('');
    
    feather.replace();
}

document.getElementById('suivi-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const codeSuivi = document.getElementById('code-suivi').value.trim().toUpperCase();
    if (!codeSuivi) return;
    
    // Afficher le loading
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('not-found').classList.add('hidden');
    
    try {
        // Rechercher le colis par code de suivi
        const response = await fetch(`http://localhost:3000/colis`);
        const allColis = await response.json();
        
        const colis = allColis.find(c => c.code_suivi === codeSuivi || c.id === codeSuivi);
        
        if (colis) {
            // Récupérer la cargaison associée si elle existe
            let cargaison = null;
            if (colis.cargaisonId) {
                const cargaisonResponse = await fetch(`http://localhost:3000/cargaisons/${colis.cargaisonId}`);
                if (cargaisonResponse.ok) {
                    cargaison = await cargaisonResponse.json();
                }
            }
            
            afficherColis(colis, cargaison);
            document.getElementById('results').classList.remove('hidden');
        } else {
            document.getElementById('not-found').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        document.getElementById('not-found').classList.remove('hidden');
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
});

// Format automatique du code de suivi
document.getElementById('code-suivi').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});
</script>
