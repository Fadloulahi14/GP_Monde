export var EtatAvance;
(function (EtatAvance) {
    EtatAvance["PENDING"] = "pending";
    EtatAvance["ARRIVED"] = "arrived";
})(EtatAvance || (EtatAvance = {}));
export class EtatAvanceUtils {
    static getAllStates() {
        return Object.values(EtatAvance);
    }
    static getLabel(etat) {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'En attente';
            case EtatAvance.ARRIVED:
                return 'Arrivé';
            default:
                return 'Inconnu';
        }
    }
    static getDescription(etat) {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'Cargaison en cours de transport';
            case EtatAvance.ARRIVED:
                return 'Cargaison arrivée à destination';
            default:
                return 'État d\'avancement inconnu';
        }
    }
    static getColor(etat) {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'orange';
            case EtatAvance.ARRIVED:
                return 'green';
            default:
                return 'gray';
        }
    }
    static isValid(value) {
        return Object.values(EtatAvance).includes(value);
    }
    static isCompleted(etat) {
        return etat === EtatAvance.ARRIVED;
    }
}
