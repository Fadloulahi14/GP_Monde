import { Personne } from './Personne';
/**
 * Classe représentant un client
 */
export class Client extends Personne {
    telephone;
    constructor(id, nom, prenom, email, adresse, telephone = '') {
        super(id, nom, prenom, email, adresse);
        this.telephone = telephone;
    }
    /**
     * Obtient le téléphone du client
     */
    getTelephone() {
        return this.telephone;
    }
    /**
     * Définit le téléphone du client
     */
    setTelephone(telephone) {
        this.telephone = telephone.trim();
    }
    /**
     * Obtient le nom complet du client (prénom + nom)
     */
    getNomComplet() {
        return `${this.prenom} ${this.nom}`.trim();
    }
    /**
     * Obtient les initiales du client
     */
    getInitiales() {
        const prenomInitial = this.prenom.length > 0 ? this.prenom.charAt(0).toUpperCase() : '';
        const nomInitial = this.nom.length > 0 ? this.nom.charAt(0).toUpperCase() : '';
        return prenomInitial + nomInitial;
    }
    /**
     * Vérifie si les informations du client sont valides
     */
    isValid() {
        return this.nom.trim() !== '' &&
            this.prenom.trim() !== '' &&
            this.email.trim() !== '' &&
            this.isValidEmail(this.email);
    }
    /**
     * Vérifie si le client a des informations de contact complètes
     */
    hasCompleteContact() {
        return this.telephone.trim() !== '' &&
            this.adresse.trim() !== '' &&
            this.email.trim() !== '';
    }
    /**
     * Vérifie si l'email est valide
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Convertit le client en objet plain
     */
    toObject() {
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
    static fromObject(data) {
        return new Client(data.id || '', data.nom || '', data.prenom || '', data.email || '', data.adresse || '', data.telephone || '');
    }
    /**
     * Représentation en chaîne
     */
    toString() {
        return this.getNomComplet();
    }
}
