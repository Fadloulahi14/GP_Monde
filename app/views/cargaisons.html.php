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
            </tbody>
        </table>
    </div>

    <div id="pagination-container" class="px-6 py-4 bg-white border-t border-gray-200">
    </div>
</div>

<div id="cargaison-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-900">Nouvelle Cargaison</h3>
                <button onclick="closeModal('cargaison-modal')" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6">
                <form id="cargaison-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Numéro</label>
                            <input type="text" name="numero" readonly
                                   class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Type</label>
                            <select name="type" required 
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Sélectionner le type</option>
                                <option value="maritime">Maritime</option>
                                <option value="aerienne">Aérienne</option>
                                <option value="routiere">Routière</option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Poids maximum (kg)</label>
                            <input type="number" name="poidsMax" required min="1" max="10000"
                                   class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                        <h4 class="font-medium text-gray-900">Informations du trajet</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Lieu de départ</label>
                                <input type="text" name="lieuDepart" required placeholder="Ex: Dakar"
                                       class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Lieu d'arrivée</label>
                                <input type="text" name="lieuArrivee" required placeholder="Ex: Saint-Louis"
                                       class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>

                        <button type="button" id="btn-calculer-trajet" 
                                class="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            Calculer trajet
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div id="map" class="w-full h-64 bg-gray-100 rounded-lg border border-gray-200"></div>
                        <div id="trajet-info" class="hidden bg-blue-50 p-4 rounded-lg space-y-2">
                            <div class="flex items-center space-x-2">
                                <span class="font-medium">Distance:</span>
                                <span id="distance-km">-</span> km
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="font-medium">Durée estimée:</span>
                                <span id="duree-estimee">-</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button type="button" onclick="closeModal('cargaison-modal')" 
                                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Annuler
                        </button>
                        <button type="submit" 
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Créer cargaison
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="module">
import { CargaisonService } from "../dist/services/CargaisonService.js";
import { CargaisonUIService } from "../dist/services/CargaisonUIService.js";
import { ApiService } from "../dist/config/api.config.js";

const service = new CargaisonService();
const uiService = new CargaisonUIService(service, '#cargaisons-list', 'input[type="text"]');

function genererNumeroCargaison() {
    const timestamp = Date.now().toString().slice(-6);
    return `CARG-${timestamp}`;
}

async function calculerTrajet() {
    const depart = document.querySelector('input[name="lieuDepart"]').value;
    const arrivee = document.querySelector('input[name="lieuArrivee"]').value;
    
    if (!depart || !arrivee) {
        alert('Veuillez saisir le lieu de départ et d\'arrivée');
        return;
    }

    try {
        const result = await uiService.calculateRoute(depart, arrivee);
        
        document.getElementById('distance-km').textContent = result.distance.toString();
        document.getElementById('duree-estimee').textContent = result.duree;
        document.getElementById('trajet-info').classList.remove('hidden');
        
        document.getElementById('trajet-info').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        alert('Erreur lors du calcul du trajet: ' + error.message);
    }
}

document.getElementById('cargaison-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const result = await service.create(formData);
        closeModal('cargaison-modal');
        uiService.init();
        alert('Cargaison créée avec succès!');
    } catch (error) {
        console.error('Erreur lors de la création de la cargaison:', error);
        alert('Erreur lors de la création de la cargaison: ' + error.message);
    }
});

document.getElementById('btn-calculer-trajet').addEventListener('click', calculerTrajet);

window.openModal = (modalId) => {
    if (modalId === 'cargaison-modal') {
        document.querySelector('input[name="numero"]').value = genererNumeroCargaison();
        
    }
    document.getElementById(modalId).classList.remove('hidden');
};

window.closeModal = (modalId) => {
    document.getElementById(modalId).classList.add('hidden');
};

window.voirCargaison = async (id) => {
    if (uiService) {
        await uiService.showCargaisonDetails(id);
    }
};

window.closeDetailsModal = () => {
    return false;
};

uiService.init();
</script>

<div id="details-cargaison-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 w-full max-w-4xl">
        <div class="relative bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900">
                    Détails de la cargaison <span id="cargaison-id-details"></span>
                </h3>
                <button type="button" class="text-gray-400 hover:text-gray-500" onclick="return false;">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="p-6">
            </div>

            <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button type="button" 
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Annuler
                </button>
                <button type="submit" 
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Appliquer
                </button>
            </div>
        </div>
    </div>
</div>