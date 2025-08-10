/**
 * Énumération représentant l'état d'un colis
 */
export enum Etat {
    RECUPERE = 'recupere',
    PERDU = 'perdu',
    ARCHIVE = 'archive',
    DEFAUT = 'defaut'
}

/**
 * Utilitaires pour l'énumération Etat
 */
export class EtatUtils {
    /**
     * Obtient tous les états disponibles
     */
    public static getAllStates(): Etat[] {
        return Object.values(Etat);
    }

    /**
     * Obtient le libellé français de l'état
     */
    public static getLabel(etat: Etat): string {
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
    public static isValid(value: string): value is Etat {
        return Object.values(Etat).includes(value as Etat);
    }
}
