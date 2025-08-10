<?php 
$pageTitle = "Gestion des Cargaisons";
$pageSubtitle = "Gérez toutes vos cargaisons";
?>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des cargaisons</h3>
            <div class="flex space-x-3">
                <input type="text" placeholder="Rechercher une cargaison..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button onclick="openModal('cargaison-modal')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i data-feather="plus" class="w-4 h-4 inline mr-2"></i>
                    Nouvelle
                </button>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poids Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trajet</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nb Colis</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">État</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody id="cargaisons-list" class="divide-y divide-gray-200">
                <!-- Les cargaisons seront insérées ici -->
            </tbody>
        </table>
    </div>
</div>

<script type="module">
    async function loadCargaisons() {
        try {
            console.log('Récupération des cargaisons depuis le serveur...');
            const response = await fetch('http://localhost:3000/cargaisons');
            const cargaisonsData = await response.json();
            console.log('Données reçues:', cargaisonsData);
            const tbody = document.getElementById('cargaisons-list');
            
            tbody.innerHTML = ''; // Clear existing content
            
            for (const cargaison of cargaisonsData) {
                const row = createCargaisonRow(cargaison);
                tbody.appendChild(row);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des cargaisons:', error);
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                alert('Impossible de se connecter au serveur JSON. Vérifiez que json-server est en cours d\'exécution.');
            } else {
                alert(`Erreur lors du chargement des cargaisons: ${error.message}`);
            }
            console.log('Stack trace:', error.stack);
        }
    }

    function createCargaisonRow(cargaison) {
        const tr = document.createElement('tr');
        
        const getEtatClass = (etat) => {
            switch(etat) {
                case 'en_cours': return 'bg-blue-100 text-blue-800';
                case 'annuler': return 'bg-red-100 text-red-800';
                case 'termine': return 'bg-green-100 text-green-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-medium text-gray-800">${cargaison.id}</td>
            <td class="px-6 py-4 text-sm text-gray-600">${cargaison.poids_total} kg</td>
            <td class="px-6 py-4 text-sm text-gray-600">
                ${cargaison.trajet.depart.ville} → ${cargaison.trajet.arrivee.ville}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">${cargaison.colis.length}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 ${getEtatClass(cargaison.etat_global)} text-xs font-medium rounded-full">
                    ${cargaison.etat_global}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">${cargaison.prix_total.toLocaleString()} FCFA</td>
            <td class="px-6 py-4 text-sm">
                <button onclick="voirCargaison('${cargaison.id}')" 
                        class="text-blue-600 hover:text-blue-800 mr-3">
                    Voir
                </button>
                <button onclick="modifierCargaison('${cargaison.id}')" 
                        class="text-gray-600 hover:text-gray-800">
                    Modifier
                </button>
            </td>
        `;
        
        return tr;
    }

    // Fonctions de gestion des actions
    window.voirCargaison = (id) => {
        // Implémentation à venir
        console.log('Voir cargaison:', id);
    };

    window.modifierCargaison = (id) => {
        // Implémentation à venir
        console.log('Modifier cargaison:', id);
    };

    // Charger les cargaisons au chargement de la page
    document.addEventListener('DOMContentLoaded', loadCargaisons);

    // Recherche de cargaisons
    document.querySelector('input[type="text"]').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#cargaisons-list tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
</script>
