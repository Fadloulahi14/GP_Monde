import { Personne } from './Personne';

/**
 * Classe représentant un client
 */
export class Client extends Personne {
    private telephone: string;

    constructor(
        id: string,
        nom: string,
        prenom: string,
        email: string,
        adresse: string,
        telephone: string = ''
    ) {
        super(id, nom, prenom, email, adresse);
        this.telephone = telephone;
    }

    /**
     * Obtient le téléphone du client
     */
    public getTelephone(): string {
        return this.telephone;
    }

    /**
     * Définit le téléphone du client
     */
    public setTelephone(telephone: string): void {
        this.telephone = telephone.trim();
    }

    /**
     * Obtient le nom complet du client (prénom + nom)
     */
    public getNomComplet(): string {
        return `${this.prenom} ${this.nom}`.trim();
    }

    /**
     * Obtient les initiales du client
     */
    public getInitiales(): string {
        const prenomInitial = this.prenom.length > 0 ? this.prenom.charAt(0).toUpperCase() : '';
        const nomInitial = this.nom.length > 0 ? this.nom.charAt(0).toUpperCase() : '';
        return prenomInitial + nomInitial;
    }

    /**
     * Vérifie si les informations du client sont valides
     */
    public isValid(): boolean {
        return this.nom.trim() !== '' && 
               this.prenom.trim() !== '' && 
               this.email.trim() !== '' && 
               this.isValidEmail(this.email);
    }

    /**
     * Vérifie si le client a des informations de contact complètes
     */
    public hasCompleteContact(): boolean {
        return this.telephone.trim() !== '' && 
               this.adresse.trim() !== '' && 
               this.email.trim() !== '';
    }

    /**
     * Vérifie si l'email est valide
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Convertit le client en objet plain
     */
    public toObject(): Record<string, any> {
        return {
            ...super.toObject(),
            telephone: this.telephone,
            nom_complet: this.getNomComplet(),
            initiales: this.getInitiales(),
            is_valid: this.isValid()
        };
    }

    /**
     * Crée un client à partir d'un objet
     */
    public static fromObject(data: Record<string, any>): Client {
        return new Client(
            data.id || '',
            data.nom || '',
            data.prenom || '',
            data.email || '',
            data.adresse || '',
            data.telephone || ''
        );
    }

    /**
     * Représentation en chaîne
     */
    public toString(): string {
        return this.getNomComplet();
    }
}
