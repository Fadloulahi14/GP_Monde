/**
 * Énumération représentant le type de produit
 */
export var TypeProduit;
(function (TypeProduit) {
    TypeProduit["ALIMENTAIRE"] = "alimentaire";
    TypeProduit["FRAGILE"] = "fragile";
    TypeProduit["INCASSABLE"] = "incassable";
    TypeProduit["CHIMIQUE"] = "chimique";
})(TypeProduit || (TypeProduit = {}));
/**
 * Utilitaires pour l'énumération TypeProduit
 */
export class TypeProduitUtils {
    /**
     * Obtient tous les types de produits disponibles
     */
    static getAllTypes() {
        return Object.values(TypeProduit);
    }
    static getLabel(type) {
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
    static getDescription(type) {
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
    static isValid(value) {
        return Object.values(TypeProduit).includes(value);
    }
    /**
     * Vérifie si le type de produit nécessite des précautions spéciales
     */
    static needsSpecialHandling(type) {
        return type === TypeProduit.FRAGILE || type === TypeProduit.CHIMIQUE;
    }
}
