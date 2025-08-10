<?php
$uri = $_GET['page'] ?? 'login';
$routes = [
    'login' => 'login.html.php',
    'dashboard' => 'dashboard.html.php',
    'cargaisons' => 'cargaisons.html.php',
    'colis' => 'colis.html.php',
    'clients' => 'clients.html.php',
    'suivi' => 'suivi.html.php',
    'rapports' => 'rapports.html.php',
];
$view = $routes[$uri] ?? 'login.html.php';
require_once 'app/views/view.php';
