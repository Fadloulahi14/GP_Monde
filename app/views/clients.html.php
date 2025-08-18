<?php 
$pageTitle = "Gestion des Clients";
$pageSubtitle = "Liste des expéditeurs et leurs colis";
?>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des expéditeurs</h3>
            <div class="flex space-x-3">
                <input type="text" 
                       id="searchClient" 
                       placeholder="Rechercher un expéditeur..." 
                       class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
    </div>
    
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom de l'expéditeur</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Colis</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody id="clientsList" class="divide-y divide-gray-200">
            </tbody>
        </table>
    </div>
</div>

<div id="clientDetailModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div id="clientDetailContent">
        </div>
    </div>
</div>

<script type="module">
import { ClientUIService } from '/dist/services/ClientUIService.js';
import { ApiService } from "../dist/config/api.config.js";

const clientUI = new ClientUIService();

document.addEventListener('DOMContentLoaded', () => {
    clientUI.loadClients('clientsList');  
    clientUI.attachSearch('searchClient', 'clientsList');
});
</script>
