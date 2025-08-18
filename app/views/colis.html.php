<?php 
$pageTitle = "Gestion des Colis";
$pageSubtitle = "Gérez tous vos colis";
?>


<div class="bg-white rounded-lg shadow-md">
    <div class="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-800">Liste des Colis</h2>
        <div class="flex space-x-3">
            <input type="text" id="searchColis" placeholder="Rechercher un colis..."
                   class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button onclick="openColisModal()"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Nouveau colis
            </button>
        </div>
    </div>

    <div class="flex flex-col">
        <div class="overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Code suivi</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Type</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Poids</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Expéditeur</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Destinataire</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">État</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Cargaison</th>
                        <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Actions</th>
                    </tr>
                </thead>
                <tbody id="colis-list" class="bg-white divide-y divide-gray-200">
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="colis-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 w-full max-w-3xl">
        <div class="relative bg-white rounded-lg shadow-xl">
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Nouveau Colis</h3>
                <button onclick="closeColisModal()" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form id="new-colis-form" class="p-6">
                <div class="space-y-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="text-sm font-medium text-gray-900 mb-4">Informations du colis</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Type de produit</label>
                                <select name="typeProduit" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    <option value="">Sélectionner un type</option>
                                    <option value="alimentaire">Alimentaire</option>
                                    <option value="fragile">Fragile</option>
                                    <option value="chimique">Chimique</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Poids (kg)</label>
                                <input type="number" name="poids" required min="0.1" step="0.1"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="text-sm font-medium text-blue-900 mb-4">Informations de l'expéditeur</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                                <input type="text" name="expediteurNom" required
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input type="tel" name="expediteurTel" required pattern="[0-9]{9}"
                                       placeholder="77XXXXXXX"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>

                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="text-sm font-medium text-green-900 mb-4">Informations du destinataire</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                                <input type="text" name="destinataireNom" required
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input type="tel" name="destinataireTel" required pattern="[0-9]{9}"
                                       placeholder="77XXXXXXX"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end space-x-3 border-t border-gray-200 pt-4">
                    <button type="button" onclick="closeColisModal()"
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Annuler
                    </button>
                    <button type="submit"
                            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Créer le colis
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<script type="module">
import { ColisService } from "../dist/services/ColisService.js";
import { ColisUIService } from "../dist/services/ColisUIService.js";
import { ApiService } from "../dist/config/api.config.js";

const colisService = new ColisService();
const uiService = new ColisUIService(colisService, "#colis-list", "#searchColis");

document.addEventListener("DOMContentLoaded", () => {
    uiService.init();
});

window.openColisModal = () => {
    document.getElementById("colis-modal")?.classList.remove("hidden");
    loadCargaisons();
};

window.closeColisModal = () => {
    document.getElementById("colis-modal")?.classList.add("hidden");
};

async function loadCargaisons() {
    try {
        const response = await fetch(ApiService.getUrl('cargaisons'));
        const cargaisons = await response.json();
        const select = document.querySelector('select[name="cargaisonId"]');
        if (select) {
            select.innerHTML = cargaisons
                .filter(c => c.etat_global === 'ouvert')
                .map(c => `<option value="${c.id}">${c.id} (${c.type})</option>`)
                .join('');
        }
    } catch (err) {
        console.error("Erreur lors du chargement des cargaisons:", err);
    }
}
</script>