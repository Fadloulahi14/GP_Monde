/**
 * Énumération représentant l'état global d'une cargaison
 */
export var EtatGlobal;
(function (EtatGlobal) {
    EtatGlobal["OUVERT"] = "ouvert";
    EtatGlobal["FERME"] = "ferme";
    EtatGlobal["EN_COURS"] = "en_cours";
    EtatGlobal["TERMINE"] = "termine";
    EtatGlobal["ANNULE"] = "annule";
})(EtatGlobal || (EtatGlobal = {}));
/**
 * Utilitaires pour l'énumération EtatGlobal
 */
export class EtatGlobalUtils {
    /**
     * Obtient tous les états globaux disponibles
     */
    static getAllStates() {
        return Object.values(EtatGlobal);
    }
    /**
     * Obtient le libellé français de l'état global
     */
    static getLabel(etat) {
        switch (etat) {
            case EtatGlobal.OUVERT:
                return 'Ouvert';
            case EtatGlobal.FERME:
                return 'Fermé';
            case EtatGlobal.EN_COURS:
                return 'En cours';
            case EtatGlobal.TERMINE:
                return 'Terminé';
            case EtatGlobal.ANNULE:
                return 'Annulé';
            default:
                return 'Inconnu';
        }
    }
    /**
     * Obtient la description de l'état global
     */
    static getDescription(etat) {
        switch (etat) {
            case EtatGlobal.OUVERT:
                return 'Cargaison ouverte, accepte de nouveaux colis';
            case EtatGlobal.FERME:
                return 'Cargaison fermée, prête pour le transport';
            case EtatGlobal.EN_COURS:
                return 'Cargaison en cours de transport';
            case EtatGlobal.TERMINE:
                return 'Cargaison terminée et livrée';
            case EtatGlobal.ANNULE:
                return 'Cargaison annulée';
            default:
                return 'État global inconnu';
        }
    }
    /**
     * Obtient la couleur associée à l'état (pour l'affichage)
     */
    static getColor(etat) {
        switch (etat) {
            case EtatGlobal.OUVERT:
                return 'blue';
            case EtatGlobal.FERME:
                return 'yellow';
            case EtatGlobal.EN_COURS:
                return 'orange';
            case EtatGlobal.TERMINE:
                return 'green';
            case EtatGlobal.ANNULE:
                return 'red';
            default:
                return 'gray';
        }
    }
    /**
     * Vérifie si l'état global est valide
     */
    static isValid(value) {
        return Object.values(EtatGlobal).includes(value);
    }
    /**
     * Vérifie si l'état permet d'ajouter des colis
     */
    static canAddColis(etat) {
        return etat === EtatGlobal.OUVERT;
    }
    /**
     * Vérifie si l'état indique que la cargaison est active
     */
    static isActive(etat) {
        return [EtatGlobal.OUVERT, EtatGlobal.FERME, EtatGlobal.EN_COURS].includes(etat);
    }
}
