export declare enum EtatColis {
    ARRIVER = "arriver",
    EN_COURS = "en_cours",
    EN_ATTENTE = "en_attente",
    ANNULER = "annuler",
    ARCHIVER = "archiver",
    RECUPERER = "recuperer",
    PERDU = "perdu"
}
export declare class EtatColisUtils {
    static getAllStates(): EtatColis[];
    static getLabel(etat: EtatColis): string;
}
