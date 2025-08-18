<?php
function renderView($viewFile, $title = null) {
    global $uri;
    
    // Définir la page actuelle pour la navigation
    $currentPage = $uri;
    
    // Capture le contenu de la vue
    ob_start();
    require_once "app/views/$viewFile";
    $content = ob_get_clean();
    
    // Choisir le layout selon la page
    if ($uri === 'login') {
        require_once 'app/views/login-layout.php';
    } elseif ($uri === 'suivi-colis') {
        require_once 'app/views/public-layout.php';
    } else {
        require_once 'app/views/dashboard-layout.php';
    }
}

// Appel de la fonction pour rendre la vue
renderView($view, isset($title) ? $title : null);
