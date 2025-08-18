<?php $title = "GPduMonde - Connexion"; ?>

<div class="space-y-6">
    <div>
        <h3 class="text-2xl font-bold text-gray-900 text-center">
            Connexion
        </h3>
        <p class="mt-2 text-center text-sm text-gray-600">
            Accédez à votre espace de gestion
        </p>
    </div>

    <form class="mt-8 space-y-6" action="" method="POST">
        <div class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                    Login
                </label>
                <div class="mt-1 relative">
                    <input id="email" name="email" type="text" autocomplete="username" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="Votre login">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <i data-feather="user" class="h-5 w-5 text-gray-400"></i>
                    </div>
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <div class="mt-1 relative">
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="Votre mot de passe">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <i data-feather="lock" class="h-5 w-5 text-gray-400"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                       class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                    Se souvenir de moi
                </label>
            </div>

            <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                    Mot de passe oublié ?
                </a>
            </div>
        </div>

        <div>
            <button type="submit" onclick="handleLogin(event)"
                    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i data-feather="log-in" class="h-5 w-5 text-blue-500 group-hover:text-blue-400"></i>
                </span>
                Se connecter
            </button>
        </div>
    </form>

    <!-- Demo credentials -->
    <!-- <div class="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 class="text-sm font-medium text-blue-800 mb-2">Compte de démonstration :</h4>
        <p class="text-sm text-blue-700">
            <strong>Email :</strong> admin@gpdum onde.com<br>
            <strong>Mot de passe :</strong> admin123
        </p>
        <p class="text-xs text-blue-600 mt-2">
            Utilisez ces identifiants pour tester l'application
        </p>
    </div> -->

    <!-- Features -->
    <!-- <div class="mt-8 grid grid-cols-1 gap-4">
        <div class="flex items-center space-x-3 text-gray-600">
            <i data-feather="shield" class="h-5 w-5 text-green-500"></i>
            <span class="text-sm">Connexion sécurisée</span>
        </div>
        <div class="flex items-center space-x-3 text-gray-600">
            <i data-feather="globe" class="h-5 w-5 text-blue-500"></i>
            <span class="text-sm">Accès 24h/24, 7j/7</span>
        </div>
        <div class="flex items-center space-x-3 text-gray-600">
            <i data-feather="smartphone" class="h-5 w-5 text-purple-500"></i>
            <span class="text-sm">Compatible mobile</span>
        </div>
    </div> -->
</div>

<script>
async function handleLogin(event) {
    event.preventDefault();
    
    const login = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!login || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/gestionnaires');
        const gestionnaires = await response.json();
        
        const gestionnaire = gestionnaires.find(g => 
            g.login === login && g.password === password
        );
        
        if (gestionnaire) {
            sessionStorage.setItem('gestionnaire', JSON.stringify(gestionnaire));
            window.location.href = '?page=dashboard';
        } else {
            alert('Login ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion. Veuillez réessayer.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Optionally pre-fill the demo credentials
    // document.getElementById('email').value = 'admin@gpdumonde.com';
    // document.getElementById('password').value = 'admin123';
});
</script>
