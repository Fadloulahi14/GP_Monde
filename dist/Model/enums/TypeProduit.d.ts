/**
 * Énumération représentant le type de produit
 */
export declare enum TypeProduit {
    ALIMENTAIRE = "alimentaire",
    FRAGILE = "fragile",
    INCASSABLE = "incassable",
    CHIMIQUE = "chimique"
}
/**
 * Utilitaires pour l'énumération TypeProduit
 */
export declare class TypeProduitUtils {
    /**
     * Obtient tous les types de produits disponibles
     */
    static getAllTypes(): TypeProduit[];
    static getLabel(type: TypeProduit): string;
    /**
     * Obtient la description du type de produit
     */
    static getDescription(type: TypeProduit): string;
    /**
     * Vérifie si le type de produit est valide
     */
    static isValid(value: string): value is TypeProduit;
    /**
     * Vérifie si le type de produit nécessite des précautions spéciales
     */
    static needsSpecialHandling(type: TypeProduit): boolean;
}
