/**
 * Énumération représentant l'état d'un colis
 */
export declare enum Etat {
    RECUPERE = "recupere",
    PERDU = "perdu",
    ARCHIVE = "archive",
    DEFAUT = "defaut"
}
/**
 * Utilitaires pour l'énumération Etat
 */
export declare class EtatUtils {
    /**
     * Obtient tous les états disponibles
     */
    static getAllStates(): Etat[];
    /**
     * Obtient le libellé français de l'état
     */
    static getLabel(etat: Etat): string;
    /**
     * Vérifie si l'état est valide
     */
    static isValid(value: string): value is Etat;
}
