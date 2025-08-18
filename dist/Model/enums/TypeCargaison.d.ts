export declare enum TypeCargaison {
    ROUTIERE = "routiere",
    MARITIME = "maritime",
    AERIENNE = "aerienne"
}
export declare class TypeCargaisonUtils {
    static getAllTypes(): TypeCargaison[];
    static getLabel(type: TypeCargaison): string;
}
