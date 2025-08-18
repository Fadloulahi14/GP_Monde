/**
 * Énumération représentant l'état global d'une cargaison
 */
export declare enum EtatGlobal {
    OUVERT = "ouvert",
    FERME = "ferme",
    EN_COURS = "en_cours",
    TERMINE = "termine",
    ANNULE = "annule"
}
/**
 * Utilitaires pour l'énumération EtatGlobal
 */
export declare class EtatGlobalUtils {
    /**
     * Obtient tous les états globaux disponibles
     */
    static getAllStates(): EtatGlobal[];
    /**
     * Obtient le libellé français de l'état global
     */
    static getLabel(etat: EtatGlobal): string;
    /**
     * Obtient la description de l'état global
     */
    static getDescription(etat: EtatGlobal): string;
    /**
     * Obtient la couleur associée à l'état (pour l'affichage)
     */
    static getColor(etat: EtatGlobal): string;
    /**
     * Vérifie si l'état global est valide
     */
    static isValid(value: string): value is EtatGlobal;
    /**
     * Vérifie si l'état permet d'ajouter des colis
     */
    static canAddColis(etat: EtatGlobal): boolean;
    /**
     * Vérifie si l'état indique que la cargaison est active
     */
    static isActive(etat: EtatGlobal): boolean;
}
