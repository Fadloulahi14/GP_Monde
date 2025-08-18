import { TypeProduit } from './enums/TypeProduit';
export class Produit {
    constructor() { }
    toObject() {
        return {
            type: this.getType()
        };
    }
    static fromObject(obj) {
        switch (obj.type) {
            case TypeProduit.ALIMENTAIRE:
                return new ProduitAlimentaire();
            case TypeProduit.CHIMIQUE:
                return new ProduitChimique(obj.degreeToxicite || 0);
            case TypeProduit.FRAGILE:
                return new ProduitMateriel(false, true);
            case TypeProduit.INCASSABLE:
                return new ProduitMateriel(true, false);
            default:
                throw new Error(`Type de produit inconnu: ${obj.type}`);
        }
    }
}
export class ProduitAlimentaire extends Produit {
    getType() {
        return TypeProduit.ALIMENTAIRE;
    }
    toObject() {
        return Object.assign({}, super.toObject());
    }
}
export class ProduitChimique extends Produit {
    constructor(degreeToxicite) {
        super();
        this.degreeToxicite = degreeToxicite;
    }
    getType() {
        return TypeProduit.CHIMIQUE;
    }
    getDegreeToxicite() {
        return this.degreeToxicite;
    }
    toObject() {
        return Object.assign(Object.assign({}, super.toObject()), { degreeToxicite: this.degreeToxicite });
    }
}
export class ProduitMateriel extends Produit {
    constructor(incassable, fragile) {
        super();
        this.incassable = incassable;
        this.fragile = fragile;
    }
    getType() {
        if (this.fragile)
            return TypeProduit.FRAGILE;
        if (this.incassable)
            return TypeProduit.INCASSABLE;
        return TypeProduit.INCASSABLE; // default
    }
    isIncassable() {
        return this.incassable;
    }
    isFragile() {
        return this.fragile;
    }
    toObject() {
        return Object.assign(Object.assign({}, super.toObject()), { incassable: this.incassable, fragile: this.fragile });
    }
}
