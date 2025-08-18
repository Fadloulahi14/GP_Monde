<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($title) ? $title : 'GPduMonde - Gestion de Cargaisons' ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        .sidebar-item:hover {
            background-color: #f8fafc;
        }
        .active-item {
            background-color: #e2e8f0;
            border-right: 3px solid #3b82f6;
        }
    </style>
</head>
<body class="bg-gray-50 font-sans">
    <!-- Sidebar -->
    <div class="fixed left-0 top-0 h-full w-64 bg-white shadow-sm border-r border-gray-200 z-50">
        <!-- Logo -->
        <div class="flex items-center px-6 py-4 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i data-feather="truck" class="w-5 h-5 text-white"></i>
                </div>
                <div>
                    <h1 class="text-lg font-bold text-gray-800">GPduMonde</h1>
                    <p class="text-xs text-gray-500">Transport Global</p>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="mt-6">
            <div class="px-4">
                <div class="sidebar-item <?= $currentPage === 'dashboard' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors">
                    <a href="?page=dashboard" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="home" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Tableau de bord</span>
                    </a>
                </div>
                
                <div class="sidebar-item <?= $currentPage === 'cargaisons' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors mt-2">
                    <a href="?page=cargaisons" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="package" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Cargaisons</span>
                    </a>
                </div>

                <div class="sidebar-item <?= $currentPage === 'colis' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors mt-2">
                    <a href="?page=colis" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="box" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Colis</span>
                    </a>
                </div>

                <div class="sidebar-item <?= $currentPage === 'clients' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors mt-2">
                    <a href="?page=clients" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="users" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Clients</span>
                    </a>
                </div>

                <div class="sidebar-item <?= $currentPage === 'suivi' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors mt-2">
                    <a href="?page=suivi" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="map-pin" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Suivi Colis</span>
                    </a>
                </div>

                <div class="sidebar-item <?= $currentPage === 'rapports' ? 'active-item' : '' ?> px-4 py-3 rounded-lg cursor-pointer transition-colors mt-2">
                    <a href="?page=rapports" class="flex items-center space-x-3 text-gray-700 no-underline">
                        <i data-feather="bar-chart-2" class="w-5 h-5 text-gray-600"></i>
                        <span class="font-medium">Rapports</span>
                    </a>
                </div>
            </div>

            <div class="border-t border-gray-200 mt-6 pt-6 px-4">
                <div class="sidebar-item px-4 py-3 rounded-lg cursor-pointer transition-colors">
                    <div class="flex items-center space-x-3">
                        <i data-feather="settings" class="w-5 h-5 text-gray-600"></i>
                        <span class="text-gray-700 font-medium">Paramètres</span>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="ml-64 min-h-screen">
        <!-- Top Header -->
        <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800" id="page-title"><?= $pageTitle ?? 'Dashboard' ?></h2>
                    <p class="text-gray-600 text-sm"><?= $pageSubtitle ?? 'Vue d\'ensemble de votre activité' ?></p>
                </div>
                <div class="flex items-center space-x-4">
                    <button onclick="openModal('cargaison-modal')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i data-feather="plus" class="w-4 h-4 inline mr-2"></i>
                        Nouvelle cargaison
                    </button>
                    <div class="flex items-center space-x-3">
                        <i data-feather="bell" class="w-5 h-5 text-gray-600"></i>
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-semibold text-sm">G</span>
                        </div>
                        <button onclick="logout()" class="ml-4 text-red-600 hover:text-red-800 transition-colors" title="Se déconnecter">
                            <i data-feather="log-out" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="p-6">
            <?= $content ?>
        </main>
    </div>

    <!-- Modal pour nouvelle cargaison -->
    <div id="cargaison-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
        <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Header du modal -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-800">Nouvelle Cargaison</h3>
                    <button onclick="closeModal('cargaison-modal')" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i data-feather="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Formulaire -->
                <form id="cargaison-form" class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Numéro de cargaison -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de cargaison <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="numero" name="numero" 
                                   placeholder="Ex: CGO-2024-001" 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required>
                        </div>

                        <!-- Type de cargaison -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Type de cargaison <span class="text-red-500">*</span>
                            </label>
                            <select id="type" name="type" 
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required>
                                <option value="">Sélectionner un type</option>
                                <option value="maritime">Maritime</option>
                                <option value="aerienne">Aérienne</option>
                                <option value="routiere">Routière</option>
                            </select>
                        </div>

                        <!-- Poids maximum -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Poids maximum (kg) <span class="text-red-500">*</span>
                            </label>
                            <input type="number" id="poidsMax" name="poidsMax" 
                                   placeholder="Ex: 5000" min="1"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required>
                        </div>

                        <!-- Lieu de départ -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Lieu de départ <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="lieuDepart" name="lieuDepart" 
                                   placeholder="Ex: Dakar, Sénégal"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required>
                        </div>

                        <!-- Lieu d'arrivée -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Lieu d'arrivée <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="lieuArrivee" name="lieuArrivee" 
                                   placeholder="Ex: Paris, France"
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required>
                        </div>

                        <!-- Description/Notes -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Description/Notes
                            </label>
                            <textarea id="description" name="description" rows="3"
                                      placeholder="Informations supplémentaires sur la cargaison..."
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                        </div>
                    </div>

                    <!-- Actions du formulaire -->
                    <div class="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                        <button type="button" onclick="closeModal('cargaison-modal')" 
                                class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Annuler
                        </button>
                        <button type="submit" 
                                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <i data-feather="save" class="w-4 h-4 inline mr-2"></i>
                            Créer la cargaison
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        feather.replace();

        function openModal(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            if (modalId === 'cargaison-modal') {
                document.getElementById('cargaison-form').reset();
            }
        }

        window.onclick = function(event) {
            const modals = ['cargaison-modal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (event.target === modal) {
                    closeModal(modalId);
                }
            });
        }

        document.getElementById('cargaison-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const cargaisonData = {
                numero: formData.get('numero'),
                type: formData.get('type'),
                poidsMax: formData.get('poidsMax'),
                lieuDepart: formData.get('lieuDepart'),
                lieuArrivee: formData.get('lieuArrivee'),
                description: formData.get('description')
            };

            if (!cargaisonData.numero || !cargaisonData.type || !cargaisonData.poidsMax) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
            }

            console.log('Données de la cargaison:', cargaisonData);
            alert('Cargaison créée avec succès !');
            closeModal('cargaison-modal');
        });

        document.addEventListener('DOMContentLoaded', function() {
            const numeroInput = document.getElementById('numero');
            if (numeroInput && !numeroInput.value) {
                const year = new Date().getFullYear();
                const month = String(new Date().getMonth() + 1).padStart(2, '0');
                const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                numeroInput.value = `CGO-${year}${month}-${randomNum}`;
            }
        });

        function logout() {
        
                window.location.href = '?page=login';
      
        }

        console.log('GPduMonde Dashboard initialized');
    </script>
</body>
</html>
