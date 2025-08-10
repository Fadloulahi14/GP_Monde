/**
 * Énumération représentant le type de produit
 */
export enum TypeProduit {
    ALIMENTAIRE = 'alimentaire',
    FRAGILE = 'fragile',
    INCASSABLE = 'incassable',
    CHIMIQUE = 'chimique'
}

/**
 * Utilitaires pour l'énumération TypeProduit
 */
export class TypeProduitUtils {
    /**
     * Obtient tous les types de produits disponibles
     */
    public static getAllTypes(): TypeProduit[] {
        return Object.values(TypeProduit);
    }

   
    public static getLabel(type: TypeProduit): string {
        switch (type) {
            case TypeProduit.ALIMENTAIRE:
                return 'Alimentaire';
            case TypeProduit.FRAGILE:
                return 'Fragile';
            case TypeProduit.INCASSABLE:
                return 'Incassable';
            case TypeProduit.CHIMIQUE:
                return 'Chimique';
            default:
                return 'Inconnu';
        }
    }

    /**
     * Obtient la description du type de produit
     */
    public static getDescription(type: TypeProduit): string {
        switch (type) {
            case TypeProduit.ALIMENTAIRE:
                return 'Produits alimentaires et denrées périssables';
            case TypeProduit.FRAGILE:
                return 'Produits fragiles nécessitant une manipulation délicate';
            case TypeProduit.INCASSABLE:
                return 'Produits résistants aux chocs';
            case TypeProduit.CHIMIQUE:
                return 'Produits chimiques et substances dangereuses';
            default:
                return 'Type de produit inconnu';
        }
    }

    /**
     * Vérifie si le type de produit est valide
     */
    public static isValid(value: string): value is TypeProduit {
        return Object.values(TypeProduit).includes(value as TypeProduit);
    }

    /**
     * Vérifie si le type de produit nécessite des précautions spéciales
     */
    public static needsSpecialHandling(type: TypeProduit): boolean {
        return type === TypeProduit.FRAGILE || type === TypeProduit.CHIMIQUE;
    }
}
