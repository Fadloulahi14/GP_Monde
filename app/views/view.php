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
    if ($viewFile === 'login.html.php' || $viewFile === 'suivi.html.php') {
        // Utiliser le layout de connexion pour la page login et suivi
        require_once 'app/views/login-layout.php';
    } else {
        // Utiliser le layout dashboard pour toutes les autres vues
        require_once 'app/views/dashboard-layout.php';
    }
}

// Appel de la fonction pour rendre la vue
renderView($view, isset($title) ? $title : null);
