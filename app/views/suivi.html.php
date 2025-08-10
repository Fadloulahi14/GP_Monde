<?php 
$pageTitle = "Suivi des Colis";
$pageSubtitle = "Suivez vos colis en temps réel";
?>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Formulaire de recherche -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Rechercher un colis</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Code de suivi</label>
                <div class="flex">
                    <input type="text" placeholder="Entrez le code de suivi..." 
                           class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <button class="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                        <i data-feather="search" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Recherche par nom de client</label>
                <input type="text" placeholder="Nom du client..." 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Numéro de cargaison</label>
                <input type="text" placeholder="Ex: CGO-2024-001..." 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
    </div>
    
    <!-- Résultats de recherche -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Informations du colis</h3>
        
        <div class="space-y-6">
            <!-- Info colis -->
            <div class="border-l-4 border-blue-500 pl-4">
                <h4 class="font-medium text-gray-800">COLIS-001</h4>
                <p class="text-sm text-gray-600">Client: Jean Dupont</p>
                <p class="text-sm text-gray-600">Cargaison: CGO-2024-001</p>
                <span class="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">En transit</span>
            </div>
            
            <!-- Timeline de suivi -->
            <div class="space-y-4">
                <h4 class="font-medium text-gray-800">Historique de suivi</h4>
                
                <div class="relative">
                    <!-- Ligne de temps -->
                    <div class="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div class="relative flex items-start space-x-3">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <i data-feather="check" class="w-4 h-4 text-green-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-800">Colis reçu à l'entrepôt</p>
                            <p class="text-xs text-gray-500">12/01/2024 - 09:30</p>
                            <p class="text-xs text-gray-600">Dakar, Sénégal</p>
                        </div>
                    </div>
                    
                    <div class="relative flex items-start space-x-3 mt-4">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i data-feather="truck" class="w-4 h-4 text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-800">Chargé dans la cargaison</p>
                            <p class="text-xs text-gray-500">13/01/2024 - 14:15</p>
                            <p class="text-xs text-gray-600">Port de Dakar</p>
                        </div>
                    </div>
                    
                    <div class="relative flex items-start space-x-3 mt-4">
                        <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <i data-feather="ship" class="w-4 h-4 text-orange-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-800">En transit maritime</p>
                            <p class="text-xs text-gray-500">14/01/2024 - 06:00</p>
                            <p class="text-xs text-gray-600">En route vers Marseille</p>
                        </div>
                    </div>
                    
                    <div class="relative flex items-start space-x-3 mt-4">
                        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <i data-feather="clock" class="w-4 h-4 text-gray-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-500">Arrivée prévue</p>
                            <p class="text-xs text-gray-500">20/01/2024 - 10:00</p>
                            <p class="text-xs text-gray-600">Port de Marseille</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Statistiques de suivi -->
<div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i data-feather="package" class="w-6 h-6 text-blue-600"></i>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-800">1,247</p>
                <p class="text-sm text-gray-600">Colis en transit</p>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i data-feather="check-circle" class="w-6 h-6 text-green-600"></i>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-800">856</p>
                <p class="text-sm text-gray-600">Colis livrés ce mois</p>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <i data-feather="clock" class="w-6 h-6 text-yellow-600"></i>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-800">23</p>
                <p class="text-sm text-gray-600">Colis en retard</p>
            </div>
        </div>
    </div>
</div>
