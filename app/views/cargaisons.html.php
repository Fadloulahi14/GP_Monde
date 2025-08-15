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

<div class="md:col-span-2 mt-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
    </label>
    <div id="colis-disponibles" class="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4">
    </div>
</div>

<script type="module">
import { CargaisonService } from "../dist/services/CargaisonService.js";
import { CargaisonUIService } from "../dist/services/CargaisonUIService.js";

const service = new CargaisonService('http://localhost:3000');
const uiService = new CargaisonUIService(service, '#cargaisons-list', 'input[type="text"]');

document.getElementById('cargaison-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        await service.create(formData);
        closeModal('cargaison-modal');
        uiService.init();
    } catch (error) {
        console.error('Erreur lors de la création de la cargaison:', error);
    }
});

// Initialiser le service UI
uiService.init();
</script>