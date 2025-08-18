import { Personne } from './Personne.js';
/**
 * Classe représentant un client
 */
export declare class Client extends Personne {
    private telephone;
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string, telephone?: string);
    /**
     * Obtient le téléphone du client
     */
    getTelephone(): string;
    /**
     * Définit le téléphone du client
     */
    setTelephone(telephone: string): void;
    /**
     * Obtient le nom complet du client (prénom + nom)
     */
    getNomComplet(): string;
    /**
     * Obtient les initiales du client
     */
    getInitiales(): string;
    /**
     * Vérifie si les informations du client sont valides
     */
    isValid(): boolean;
    /**
     * Vérifie si le client a des informations de contact complètes
     */
    hasCompleteContact(): boolean;
    /**
     * Vérifie si l'email est valide
     */
    private isValidEmail;
    /**
     * Convertit le client en objet plain
     */
    toObject(): Record<string, any>;
    /**
     * Crée un client à partir d'un objet
     */
    static fromObject(data: Record<string, any>): Client;
    /**
     * Représentation en chaîne
     */
    toString(): string;
}
