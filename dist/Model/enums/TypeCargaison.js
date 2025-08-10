export var TypeCargaison;
(function (TypeCargaison) {
    TypeCargaison["ROUTIERE"] = "routiere";
    TypeCargaison["MARITIME"] = "maritime";
    TypeCargaison["AERIENNE"] = "aerienne";
})(TypeCargaison || (TypeCargaison = {}));
export class TypeCargaisonUtils {
    static getAllTypes() {
        return Object.values(TypeCargaison);
    }
    static getLabel(type) {
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
