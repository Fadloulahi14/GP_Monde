<?php


$uri = $_GET['page'] ?? 'suivi-colis'; 
$public_routes = [
    'suivi-colis' => 'suivi-colis.html.php',
    'login' => 'login.html.php'
];




$protected_routes = [
    'dashboard' => 'dashboard.html.php',
    'cargaisons' => 'cargaisons.html.php',
    'colis' => 'colis.html.php',
    'clients' => 'clients.html.php',
    'rapports' => 'rapports.html.php',
];




$view = $public_routes[$uri] ?? $protected_routes[$uri] ?? 'suivi-colis.html.php';
require_once 'app/views/view.php';
