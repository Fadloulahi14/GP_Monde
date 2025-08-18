export declare abstract class Personne {
    protected id: string;
    protected nom: string;
    protected prenom: string;
    protected email: string;
    protected adresse: string;
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string);
    getId(): string;
    getNom(): string;
    getPrenom(): string;
    getEmail(): string;
    getAdresse(): string;
    setNom(nom: string): void;
    setPrenom(prenom: string): void;
    setEmail(email: string): void;
    setAdresse(adresse: string): void;
    /**
     * Convertit la personne en objet plain
     */
    toObject(): Record<string, any>;
}
