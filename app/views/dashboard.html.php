<?php 
$pageTitle = "Tableau de bord";
$pageSubtitle = "Vue d'ensemble de votre activité";
?>

<!-- Ajoutez ces liens dans le head -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Stats Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Cargaisons actives</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i data-feather="package" class="w-6 h-6 text-blue-600"></i>
            </div>
        </div>
        <div class="mt-4">
            <span class="text-green-600 text-sm font-medium">+12% ce mois</span>
        </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Colis en transit</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">1,247</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i data-feather="truck" class="w-6 h-6 text-orange-600"></i>
            </div>
        </div>
        <div class="mt-4">
            <span class="text-green-600 text-sm font-medium">+8% ce mois</span>
        </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Revenus (FCFA)</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">2,847,500</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i data-feather="dollar-sign" class="w-6 h-6 text-green-600"></i>
            </div>
        </div>
        <div class="mt-4">
            <span class="text-green-600 text-sm font-medium">+15% ce mois</span>
        </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Clients actifs</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">487</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i data-feather="users" class="w-6 h-6 text-purple-600"></i>
            </div>
        </div>
        <div class="mt-4">
            <span class="text-green-600 text-sm font-medium">+5% ce mois</span>
        </div>
    </div>
</div>


<!-- ...existing code... -->

<!-- Carte des cargaisons -->
<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Suivi des Cargaisons</h2>
    <div id="map" style="height: 350px; width: 100%; border-radius: 0.5rem;"></div>
</div>

<script>
// Initialisation de la carte
const map = L.map('map').setView([14.6937, -17.4441], 6); // Centré sur le Sénégal

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fonction pour charger et afficher les cargaisons
async function loadCargaisons() {
    try {
        const response = await fetch('http://localhost:3000/cargaisons');
        const cargaisons = await response.json();
        
        cargaisons.forEach(cargaison => {
            if (cargaison.trajet && cargaison.trajet.depart && cargaison.trajet.arrivee) {
                // Marqueur pour le point de départ
                L.marker([cargaison.trajet.depart.lat, cargaison.trajet.depart.lng])
                    .bindPopup(`
                        <b>Départ</b><br>
                        Cargaison: ${cargaison.id}<br>
                        Status: ${cargaison.etat_global}
                    `)
                    .addTo(map);

                // Marqueur pour le point d'arrivée
                L.marker([cargaison.trajet.arrivee.lat, cargaison.trajet.arrivee.lng])
                    .bindPopup(`
                        <b>Arrivée</b><br>
                        Cargaison: ${cargaison.id}<br>
                        Status: ${cargaison.etat_global}
                    `)
                    .addTo(map);

                // Ligne entre le départ et l'arrivée
                L.polyline([
                    [cargaison.trajet.depart.lat, cargaison.trajet.depart.lng],
                    [cargaison.trajet.arrivee.lat, cargaison.trajet.arrivee.lng]
                ], {
                    color: cargaison.etat_global === 'en_cours' ? 'blue' : 'gray',
                    weight: 2
                }).addTo(map);
            }
        });
    } catch (error) {
        console.error('Erreur lors du chargement des cargaisons:', error);
    }
}

// Charger les cargaisons au chargement de la page
loadCargaisons();
</script>