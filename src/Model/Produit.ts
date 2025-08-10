import { TypeProduit } from './enums/TypeProduit';

export abstract class Produit {
    constructor() {}

    abstract getType(): TypeProduit;

    public toObject(): Record<string, any> {
        return {
            type: this.getType()
        };
    }

    public static fromObject(obj: Record<string, any>): Produit {
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
    getType(): TypeProduit {
        return TypeProduit.ALIMENTAIRE;
    }

    public toObject(): Record<string, any> {
        return {
            ...super.toObject()
        };
    }
}

export class ProduitChimique extends Produit {
    private degreeToxicite: number;

    constructor(degreeToxicite: number) {
        super();
        this.degreeToxicite = degreeToxicite;
    }

    getType(): TypeProduit {
        return TypeProduit.CHIMIQUE;
    }

    getDegreeToxicite(): number {
        return this.degreeToxicite;
    }

    public toObject(): Record<string, any> {
        return {
            ...super.toObject(),
            degreeToxicite: this.degreeToxicite
        };
    }
}

export class ProduitMateriel extends Produit {
    private incassable: boolean;
    private fragile: boolean;

    constructor(incassable: boolean, fragile: boolean) {
        super();
        this.incassable = incassable;
        this.fragile = fragile;
    }

    getType(): TypeProduit {
        if (this.fragile) return TypeProduit.FRAGILE;
        if (this.incassable) return TypeProduit.INCASSABLE;
        return TypeProduit.INCASSABLE; // default
    }

    isIncassable(): boolean {
        return this.incassable;
    }

    isFragile(): boolean {
        return this.fragile;
    }

    public toObject(): Record<string, any> {
        return {
            ...super.toObject(),
            incassable: this.incassable,
            fragile: this.fragile
        };
    }
}
