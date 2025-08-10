<?php 
$pageTitle = "Rapports et Statistiques";
$pageSubtitle = "Analysez vos données de transport";
?>

<!-- Graphiques et métriques -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Graphique des revenus -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenus mensuels (FCFA)</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
                <i data-feather="bar-chart-2" class="w-16 h-16 text-gray-400 mx-auto mb-2"></i>
                <p class="text-gray-500">Graphique des revenus</p>
                <p class="text-sm text-gray-400">Intégration graphique à venir</p>
            </div>
        </div>
    </div>
    
    <!-- Graphique des expéditions -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Expéditions par type</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
                <i data-feather="pie-chart" class="w-16 h-16 text-gray-400 mx-auto mb-2"></i>
                <p class="text-gray-500">Répartition par type</p>
                <p class="text-sm text-gray-400">Maritime • Aérienne • Routière</p>
            </div>
        </div>
    </div>
</div>

<!-- Métriques détaillées -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Revenus totaux</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">8,547,230</p>
                <p class="text-xs text-gray-500">FCFA ce mois</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i data-feather="trending-up" class="w-6 h-6 text-green-600"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Cargaisons complétées</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">47</p>
                <p class="text-xs text-gray-500">Ce mois</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i data-feather="package" class="w-6 h-6 text-blue-600"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Temps moyen livraison</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">12.5</p>
                <p class="text-xs text-gray-500">Jours</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i data-feather="clock" class="w-6 h-6 text-orange-600"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-600 text-sm">Taux de satisfaction</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">94.2%</p>
                <p class="text-xs text-gray-500">Clients satisfaits</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i data-feather="star" class="w-6 h-6 text-purple-600"></i>
            </div>
        </div>
    </div>
</div>

<!-- Tableaux de rapports -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Top destinations -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Top destinations</h3>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i data-feather="map-pin" class="w-4 h-4 text-blue-600"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">France</p>
                            <p class="text-sm text-gray-600">Paris, Marseille, Lyon</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">42%</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <i data-feather="map-pin" class="w-4 h-4 text-green-600"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Côte d'Ivoire</p>
                            <p class="text-sm text-gray-600">Abidjan, Bouaké</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">28%</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <i data-feather="map-pin" class="w-4 h-4 text-orange-600"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Mali</p>
                            <p class="text-sm text-gray-600">Bamako, Kayes</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">18%</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i data-feather="map-pin" class="w-4 h-4 text-purple-600"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Autres</p>
                            <p class="text-sm text-gray-600">Divers pays</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">12%</span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Clients top -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Meilleurs clients</h3>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-semibold text-sm">JD</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Jean Dupont</p>
                            <p class="text-sm text-gray-600">15 colis</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">245,000 F</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-semibold text-sm">MM</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Marie Martin</p>
                            <p class="text-sm text-gray-600">12 colis</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">198,500 F</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span class="text-orange-600 font-semibold text-sm">FS</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Fatou Sall</p>
                            <p class="text-sm text-gray-600">8 colis</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">156,000 F</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-purple-600 font-semibold text-sm">PD</span>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800">Pierre Durand</p>
                            <p class="text-sm text-gray-600">6 colis</p>
                        </div>
                    </div>
                    <span class="text-sm font-medium text-gray-800">89,200 F</span>
                </div>
            </div>
        </div>
    </div>
</div>
