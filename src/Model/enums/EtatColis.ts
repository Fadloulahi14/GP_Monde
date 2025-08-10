export enum EtatColis {
    ARRIVER = 'arriver',
    EN_COURS = 'en_cours',
    EN_ATTENTE = 'en_attente',
    ANNULER = 'annuler',
    ARCHIVER = 'archiver',
    RECUPERER = 'recuperer',
    PERDU = 'perdu'
}

export class EtatColisUtils {
    public static getAllStates(): EtatColis[] {
        return Object.values(EtatColis);
    }

    public static getLabel(etat: EtatColis): string {
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
