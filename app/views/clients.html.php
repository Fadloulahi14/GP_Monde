<?php 
$pageTitle = "Gestion des Clients";
$pageSubtitle = "Gérez vos informations clients";
?>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des clients</h3>
            <div class="flex space-x-3">
                <input type="text" id="searchClient" placeholder="Rechercher un client..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button onclick="openNewClientModal()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i data-feather="user-plus" class="w-4 h-4 inline mr-2"></i>
                    Nouveau client
                </button>
            </div>
        </div>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom complet</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nb Colis</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody id="clientsList" class="divide-y divide-gray-200">
            </tbody>
        </table>
    </div>
</div>

<script type="module">
    import { ServiceUIClient } from '../dist/services/ServiceUIClient.js';

    const uiClient = new ServiceUIClient();

    document.addEventListener('DOMContentLoaded', () => {
        uiClient.loadClients('clientsList');
        uiClient.attachSearch('searchClient', 'clientsList');
        uiClient.attachRowActions('clientsList');
    });
</script>
