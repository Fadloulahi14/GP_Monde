<?php 
$pageTitle = "Gestion des Colis";
$pageSubtitle = "Gérez tous vos colis";
?>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des colis</h3>
            <div class="flex space-x-3">
                <input type="text" placeholder="Rechercher un colis..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button onclick="openNewColisModal()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <i data-feather="plus" class="w-4 h-4 inline mr-2"></i>
                    Nouveau colis
                </button>
            </div>
        </div>
    </div>

    <div id="colis-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <!-- Les colis seront chargés ici dynamiquement -->
    </div>
</div>

<!-- Formulaire de création de colis -->
<div id="colis-form-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold">Nouveau Colis</h3>
            </div>
            <form id="new-colis-form" class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Cargaison</label>
                        <select name="cargaisonId" required 
                                class="mt-1 block w-full rounded-md border-gray-300">
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Type de produit</label>
                        <select name="typeProduit" required 
                                class="mt-1 block w-full rounded-md border-gray-300">
                            <option value="alimentaire">Alimentaire</option>
                            <option value="chimique">Chimique</option>
                            <option value="materiel">Matériel</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Poids (kg)</label>
                        <input type="number" name="poids" required min="0" step="0.1"
                               class="mt-1 block w-full rounded-md border-gray-300">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Expéditeur</label>
                        <select name="expediteurId" required 
                                class="mt-1 block w-full rounded-md border-gray-300">
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Destinataire</label>
                        <select name="destinataireId" required 
                                class="mt-1 block w-full rounded-md border-gray-300">
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" onclick="closeColisModal()" 
                            class="px-4 py-2 border rounded-md">Annuler</button>
                    <button type="submit" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md">Créer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="module">
    async function loadColis() {
        try {
            // Charger les données nécessaires depuis l'API
            const response = await fetch('http://localhost:3000/colis');
            if (!response.ok) {
                throw new Error(`Erreur HTTP! status: ${response.status}`);
            }
            const colisData = await response.json();

            const colisGrid = document.getElementById('colis-grid');
            colisGrid.innerHTML = '';

            for (const colisItem of colisData) {
                // Pour chaque colis, charger ses données associées
                const [clientData, personneData, cargaisonData] = await Promise.all([
                    fetch(`http://localhost:3000/clients/${colisItem.clientId}`).then(r => r.ok ? r.json() : null),
                    fetch(`http://localhost:3000/personnes/${colisItem.personneId}`).then(r => r.ok ? r.json() : null),
                    fetch(`http://localhost:3000/cargaisons/${colisItem.cargaisonId}`).then(r => r.ok ? r.json() : null)
                ]);

                const colisCard = createColisCard(colisItem, personneData, cargaisonData);
                colisGrid.appendChild(colisCard);
            }
            
            // Initialiser les icônes Feather
            if (window.feather) {
                feather.replace();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des colis:', error);
            alert('Erreur lors du chargement des colis. Veuillez réessayer.');
        }
    }

    function createColisCard(colis, personne, cargaison) {
        const div = document.createElement('div');
        div.className = 'border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow';
        
        const getEtatClass = (etat) => {
            const classes = {
                'en_cours': 'bg-blue-100 text-blue-800',
                'en_attente': 'bg-yellow-100 text-yellow-800',
                'annuler': 'bg-red-100 text-red-800',
                'recuperer': 'bg-green-100 text-green-800',
                'archiver': 'bg-gray-100 text-gray-800'
            };
            return classes[etat] || classes.en_attente;
        };

        div.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-medium text-gray-500">${colis.id}</span>
                <span class="px-2 py-1 ${getEtatClass(colis.etat)} text-xs rounded-full">
                    ${colis.etat}
                </span>
            </div>
            <h4 class="font-medium text-gray-800 mb-2">${colis.Type_cargaison || 'Type non défini'}</h4>
            <p class="text-sm text-gray-600 mb-3">Poids: ${colis.Poids} kg</p>
            <p class="text-sm text-gray-600 mb-3">
                Client: ${personne ? `${personne.prenom} ${personne.nom}` : 'Non assigné'}
            </p>
            <p class="text-sm text-gray-600">
                Cargaison: ${cargaison ? cargaison.id : 'Non assignée'}
            </p>
            <div class="mt-4 flex space-x-2">
                <button onclick="voirDetailsColis('${colis.id}')" 
                        class="text-blue-600 text-sm hover:text-blue-800">
                    Détails
                </button>
                <button onclick="suivreColis('${colis.id}')" 
                        class="text-green-600 text-sm hover:text-green-800">
                    Suivre
                </button>
            </div>
        `;
        
        return div;
    }

    // Fonctions de gestion des actions
    window.voirDetailsColis = (id) => {
        // À implémenter: afficher les détails du colis
        console.log('Voir détails du colis:', id);
    };

    window.suivreColis = (id) => {
        // À implémenter: suivre le colis
        console.log('Suivre le colis:', id);
    };

    window.openNewColisModal = () => {
        // À implémenter: ouvrir le modal de création de colis
        console.log('Ouvrir le modal de création de colis');
    };

    // Recherche de colis
    document.querySelector('input[type="text"]').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('#colis-grid > div');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Charger les colis au chargement de la page
    document.addEventListener('DOMContentLoaded', loadColis);

    async function loadFormData() {
        const [cargaisons, clients] = await Promise.all([
            fetch('http://localhost:3000/cargaisons').then(r => r.json()),
            fetch('http://localhost:3000/clients').then(r => r.json())
        ]);

        const cargaisonSelect = document.querySelector('select[name="cargaisonId"]');
        const expediteurSelect = document.querySelector('select[name="expediteurId"]');
        const destinataireSelect = document.querySelector('select[name="destinataireId"]');

        // Charger uniquement les cargaisons ouvertes
        cargaisonSelect.innerHTML = cargaisons
            .filter(c => c.etat_global === 'ouvert')
            .map(c => `<option value="${c.id}">${c.id}</option>`)
            .join('');

        // Charger les clients pour expéditeur et destinataire
        const clientOptions = clients.map(c => `<option value="${c.id}">${c.nom}</option>`).join('');
        expediteurSelect.innerHTML = clientOptions;
        destinataireSelect.innerHTML = clientOptions;
    }

    document.getElementById('new-colis-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('http://localhost:3000/colis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: `COL-${Date.now()}`,
                    Type_cargaison: formData.get('typeProduit'),
                    Poids: Number(formData.get('poids')),
                    expediteurId: formData.get('expediteurId'),
                    destinataireId: formData.get('destinataireId'),
                    cargaisonId: formData.get('cargaisonId'),
                    etat: 'en_attente'
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            closeColisModal();
            location.reload();
        } catch (error) {
            console.error('Erreur:', error);
        }
    });

    window.openColisModal = () => {
        document.getElementById('colis-form-modal').classList.remove('hidden');
        loadFormData();
    };

    window.closeColisModal = () => {
        document.getElementById('colis-form-modal').classList.add('hidden');
    };
</script>
