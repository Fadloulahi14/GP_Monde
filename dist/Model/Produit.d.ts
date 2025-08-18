import { TypeProduit } from './enums/TypeProduit';
export declare abstract class Produit {
    constructor();
    abstract getType(): TypeProduit;
    toObject(): Record<string, any>;
    static fromObject(obj: Record<string, any>): Produit;
}
export declare class ProduitAlimentaire extends Produit {
    getType(): TypeProduit;
    toObject(): Record<string, any>;
}
export declare class ProduitChimique extends Produit {
    private degreeToxicite;
    constructor(degreeToxicite: number);
    getType(): TypeProduit;
    getDegreeToxicite(): number;
    toObject(): Record<string, any>;
}
export declare class ProduitMateriel extends Produit {
    private incassable;
    private fragile;
    constructor(incassable: boolean, fragile: boolean);
    getType(): TypeProduit;
    isIncassable(): boolean;
    isFragile(): boolean;
    toObject(): Record<string, any>;
}
