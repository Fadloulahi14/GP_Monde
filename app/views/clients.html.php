<?php 
$pageTitle = "Gestion des Clients";
$pageSubtitle = "Gérez vos informations clients";
?>

<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des clients</h3>
            <div class="flex space-x-3">
                <input type="text" placeholder="Rechercher un client..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nb Colis</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">Jean Dupont</td>
                    <td class="px-6 py-4 text-sm text-gray-600">jean.dupont@email.com</td>
                    <td class="px-6 py-4 text-sm text-gray-600">+221 77 123 45 67</td>
                    <td class="px-6 py-4 text-sm text-gray-600">5</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Actif</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button class="text-blue-600 hover:text-blue-800 mr-3">Voir</button>
                        <button class="text-gray-600 hover:text-gray-800">Modifier</button>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">Marie Martin</td>
                    <td class="px-6 py-4 text-sm text-gray-600">marie.martin@email.com</td>
                    <td class="px-6 py-4 text-sm text-gray-600">+33 6 12 34 56 78</td>
                    <td class="px-6 py-4 text-sm text-gray-600">12</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Actif</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button class="text-blue-600 hover:text-blue-800 mr-3">Voir</button>
                        <button class="text-gray-600 hover:text-gray-800">Modifier</button>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">Pierre Durand</td>
                    <td class="px-6 py-4 text-sm text-gray-600">pierre.durand@email.com</td>
                    <td class="px-6 py-4 text-sm text-gray-600">+221 70 987 65 43</td>
                    <td class="px-6 py-4 text-sm text-gray-600">3</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Inactif</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button class="text-blue-600 hover:text-blue-800 mr-3">Voir</button>
                        <button class="text-gray-600 hover:text-gray-800">Modifier</button>
                    </td>
                </tr>
                <tr>
                    <td class="px-6 py-4 text-sm font-medium text-gray-800">Fatou Sall</td>
                    <td class="px-6 py-4 text-sm text-gray-600">fatou.sall@email.com</td>
                    <td class="px-6 py-4 text-sm text-gray-600">+221 76 555 44 33</td>
                    <td class="px-6 py-4 text-sm text-gray-600">8</td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Actif</span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                        <button class="text-blue-600 hover:text-blue-800 mr-3">Voir</button>
                        <button class="text-gray-600 hover:text-gray-800">Modifier</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
