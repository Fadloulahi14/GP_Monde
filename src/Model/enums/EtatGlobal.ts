/**
 * Énumération représentant l'état global d'une cargaison
 */
export enum EtatGlobal {
    OUVERT = 'ouvert',
    FERME = 'ferme',
    EN_COURS = 'en_cours',
    TERMINE = 'termine',
    ANNULE = 'annule'
}

/**
 * Utilitaires pour l'énumération EtatGlobal
 */
export class EtatGlobalUtils {
    /**
     * Obtient tous les états globaux disponibles
     */
    public static getAllStates(): EtatGlobal[] {
        return Object.values(EtatGlobal);
    }

    /**
     * Obtient le libellé français de l'état global
     */
    public static getLabel(etat: EtatGlobal): string {
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
    public static getDescription(etat: EtatGlobal): string {
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
    public static getColor(etat: EtatGlobal): string {
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
    public static isValid(value: string): value is EtatGlobal {
        return Object.values(EtatGlobal).includes(value as EtatGlobal);
    }

    /**
     * Vérifie si l'état permet d'ajouter des colis
     */
    public static canAddColis(etat: EtatGlobal): boolean {
        return etat === EtatGlobal.OUVERT;
    }

    /**
     * Vérifie si l'état indique que la cargaison est active
     */
    public static isActive(etat: EtatGlobal): boolean {
        return [EtatGlobal.OUVERT, EtatGlobal.FERME, EtatGlobal.EN_COURS].includes(etat);
    }
}
