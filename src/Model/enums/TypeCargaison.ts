export enum TypeCargaison {
    ROUTIERE = 'routiere',
    MARITIME = 'maritime',
    AERIENNE = 'aerienne'
}

export class TypeCargaisonUtils {
    public static getAllTypes(): TypeCargaison[] {
        return Object.values(TypeCargaison);
    }

    public static getLabel(type: TypeCargaison): string {
        switch (type) {
            case TypeCargaison.ROUTIERE:
                return 'Routière';
            case TypeCargaison.MARITIME:
                return 'Maritime';
            case TypeCargaison.AERIENNE:
                return 'Aérienne';
            default:
                return 'Inconnu';
        }
    }
}
