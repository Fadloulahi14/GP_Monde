<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($title) ? $title : 'GPduMonde - Connexion' ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js"></script>
    <style>
       
    </style>
</head>
<body class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="">
        <div class="text-center">
            <div class="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <i data-feather="truck" class="h-8 w-8 text-blue-600"></i>
            </div>
            <h2 class="mt-6 text-3xl font-extrabold text-white">
                GPduMonde
            </h2>
            <p class="mt-2 text-sm text-blue-100">
                Transport Global - Connectez-vous à votre compte
            </p>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-8">
            <?= $content ?>
        </div>

        <div class="text-center">
            <p class="text-blue-100 text-sm">
                &copy; <?= date('Y') ?> GPduMonde. Développé par Fadloulahi Dev 778012731.
            </p>
        </div>
    </div>

    <script>
        feather.replace();
    </script>
</body>
</html>
