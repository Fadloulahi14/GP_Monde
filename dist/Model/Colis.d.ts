/**
 * Classe représentant un colis
 */
export declare class Colis {
    private id;
    private code_suivi;
    private typeProduit;
    private poids;
    private expediteur;
    private destinataire;
    private etat;
    private cargaisonId?;
    constructor(id: string, code_suivi: string, typeProduit: string, poids: number, expediteur: string, destinataire: string, etat: string, cargaisonId?: string | undefined);
    getId(): string;
    getCodeSuivi(): string;
    getTypeProduit(): string;
    getPoidsTotal(): number;
    getExpediteur(): string;
    getDestinataire(): string;
    getEtat(): string;
    getCargaison(): string | undefined;
    setEtat(etat: string): void;
    setCargaison(cargaisonId: string): void;
    toString(): string;
}
