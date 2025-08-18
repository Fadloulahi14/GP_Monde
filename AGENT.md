# GPduMonde - Guide pour Amp

## Architecture du Projet

### Structure des dossiers
```
projetCargrition/
├── app/
│   ├── views/           # Vues PHP
│   └── route/           # Routage
├── src/
│   ├── Model/           # Classes TypeScript
│   └── services/        # Services TypeScript
├── dist/                # Code TypeScript compilé
└── db.json             # Base de données JSON
```

### Technologies utilisées
- **Frontend**: PHP, HTML, Tailwind CSS, Feather Icons
- **Backend Logic**: TypeScript (services métier)
- **Base de données**: JSON Server (db.json)
- **Build**: TypeScript Compiler (tsc)

## Commandes importantes

### Développement
```bash
# Compiler TypeScript
npm run build

# Démarrer JSON Server (base de données)
npx json-server --watch db.json --port 3000

# Démarrer serveur PHP local
php -S localhost:8000 -t . index.php
```

### Endpoints API
- `http://localhost:3000/cargaisons`
- `http://localhost:3000/colis`
- `http://localhost:3000/clients`
- `http://localhost:3000/personnes`
- `http://localhost:3000/gestionnaires`
- `http://localhost:3000/enums`

## Architecture des Classes

### Cargaison
- **Validation**: 1-10 colis maximum par cargaison
- **États**: Ouvert/Fermé/En cours/Terminé
- **Prix**: Minimum 10.000 FCFA par colis
- **Réouverture**: Possible uniquement si EN_ATTENTE

### Colis
- **Code suivi**: Format XX123456 (2 lettres + 6 chiffres)
- **États**: en_attente, en_cours, arriver, recuperer, perdu, annuler, archiver
- **Génération facture**: Automatique avec code de suivi

### Services TypeScript
- `CargaisonService`: Gestion CRUD cargaisons
- `ColisService`: Gestion CRUD colis + génération codes
- `CargaisonUIService`: Interface utilisateur cargaisons
- `ColisUIService`: Interface utilisateur colis

## Fonctionnalités implémentées

### ✅ Gestion des Cargaisons
- Création avec validation (lieu départ/arrivée, type, poids max)
- Affichage liste avec recherche
- Calcul automatique trajet et distance
- Fermeture/Réouverture avec règles métier
- Intégration cartes (Google Maps optionnel)

### ✅ Gestion des Colis
- Création avec code de suivi auto-généré
- Association à une cargaison
- Gestion expéditeur/destinataire
- Changement d'états
- Génération facture avec reçu

### ✅ Suivi Client
- Recherche par code de suivi
- Affichage état en temps réel
- Carte du trajet
- Historique des états
- Interface publique (pas de connexion requise)

### ✅ Interface Utilisateur
- Dashboard responsive avec Tailwind CSS
- Sidebar de navigation
- Modals pour création/modification
- Messages de validation
- Recherche en temps réel

## Règles Métier Respectées

### Cargaisons
- Minimum 1 colis, maximum 10 colis
- Poids maximum définissable
- Types: Maritime, Aérienne, Routière
- États avec transitions contrôlées

### Colis
- Prix minimum 10.000 FCFA
- Code de suivi unique et sécurisé
- Traçabilité complète
- Facture automatique

### Sécurité
- Validation côté client et serveur
- Codes de suivi non devinables
- Pas d'exposition de données sensibles

## Pages disponibles
- `/` : Dashboard principal
- `?page=cargaisons` : Gestion cargaisons
- `?page=colis` : Gestion colis
- `?page=clients` : Gestion clients
- `?page=suivi` : Suivi public des colis
- `?page=login` : Connexion gestionnaire

## Notes de maintenance
- Code TypeScript dans `src/` puis compilé vers `dist/`
- Base de données JSON sauvegardée automatiquement
- Architecture modulaire et réutilisable
- Respect des principes SOLID
- Services découplés pour faciliter les tests
