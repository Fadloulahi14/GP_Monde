export var EtatColis;
(function (EtatColis) {
    EtatColis["ARRIVER"] = "arriver";
    EtatColis["EN_COURS"] = "en_cours";
    EtatColis["EN_ATTENTE"] = "en_attente";
    EtatColis["ANNULER"] = "annuler";
    EtatColis["ARCHIVER"] = "archiver";
    EtatColis["RECUPERER"] = "recuperer";
    EtatColis["PERDU"] = "perdu";
})(EtatColis || (EtatColis = {}));
export class EtatColisUtils {
    static getAllStates() {
        return Object.values(EtatColis);
    }
    static getLabel(etat) {
        switch (etat) {
            case EtatColis.ARRIVER:
                return 'Arrivé';
            case EtatColis.EN_COURS:
                return 'En cours';
            case EtatColis.EN_ATTENTE:
                return 'En attente';
            case EtatColis.ANNULER:
                return 'Annulé';
            case EtatColis.ARCHIVER:
                return 'Archivé';
            case EtatColis.RECUPERER:
                return 'Récupéré';
            case EtatColis.PERDU:
                return 'Perdu';
            default:
                return 'Inconnu';
        }
    }
}
