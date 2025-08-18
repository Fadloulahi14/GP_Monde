<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($title) ? $title : 'GPduMonde - Suivi de Colis' ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <i data-feather="truck" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="ml-3">
                        <h1 class="text-xl font-bold text-gray-800">GPduMonde</h1>
                        <p class="text-xs text-gray-500">Transport Global</p>
                    </div>
                </div>

                <div class="hidden md:block">
                    <div class="flex items-center space-x-4">
                        <a href="?page=suivi-colis" 
                           class="<?= $currentPage === 'suivi-colis' ? 'text-blue-600' : 'text-gray-600' ?> hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Suivi de colis
                        </a>
                        <a href="#services" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Nos services
                        </a>
                        <a href="#contact" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </a>
                        <a href="?page=login" 
                           class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center">
                            <i data-feather="log-in" class="w-4 h-4 mr-2"></i>
                            Se connecter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <?= $content ?>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                        À propos
                    </h3>
                    <p class="text-gray-600 text-sm">
                        GPduMonde est votre partenaire de confiance pour le transport et la logistique internationale.
                    </p>
                </div>
                <div>
                    <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                        Services
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Transport maritime</a>
                        </li>
                        <li>
                            <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Transport aérien</a>
                        </li>
                        <li>
                            <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Transport routier</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                        Contact
                    </h3>
                    <ul class="space-y-2">
                        <li class="text-sm text-gray-600">
                            <i data-feather="phone" class="w-4 h-4 inline mr-2"></i>
                            +221 77 801 27 31
                        </li>
                        <li class="text-sm text-gray-600">
                            <i data-feather="mail" class="w-4 h-4 inline mr-2"></i>
                            contact@gpdumonde.com
                        </li>
                        <li class="text-sm text-gray-600">
                            <i data-feather="map-pin" class="w-4 h-4 inline mr-2"></i>
                            Dakar, Sénégal
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-8 border-t border-gray-200 pt-8">
                <p class="text-center text-sm text-gray-600">
                    © <?= date('Y') ?> GPduMonde. Développé par Fadloulahi Dev.
                </p>
            </div>
        </div>
    </footer>

    <script>
        feather.replace();
    </script>
</body>
</html>