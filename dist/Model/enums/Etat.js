/**
 * Énumération représentant l'état d'un colis
 */
export var Etat;
(function (Etat) {
    Etat["RECUPERE"] = "recupere";
    Etat["PERDU"] = "perdu";
    Etat["ARCHIVE"] = "archive";
    Etat["DEFAUT"] = "defaut";
})(Etat || (Etat = {}));
/**
 * Utilitaires pour l'énumération Etat
 */
export class EtatUtils {
    /**
     * Obtient tous les états disponibles
     */
    static getAllStates() {
        return Object.values(Etat);
    }
    /**
     * Obtient le libellé français de l'état
     */
    static getLabel(etat) {
        switch (etat) {
            case Etat.RECUPERE:
                return 'Récupéré';
            case Etat.PERDU:
                return 'Perdu';
            case Etat.ARCHIVE:
                return 'Archivé';
            case Etat.DEFAUT:
                return 'Par défaut';
            default:
                return 'Inconnu';
        }
    }
    /**
     * Vérifie si l'état est valide
     */
    static isValid(value) {
        return Object.values(Etat).includes(value);
    }
}
