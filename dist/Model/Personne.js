export class Personne {
    id;
    nom;
    prenom;
    email;
    adresse;
    constructor(id, nom, prenom, email, adresse) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.adresse = adresse;
    }
    // Getters
    getId() {
        return this.id;
    }
    getNom() {
        return this.nom;
    }
    getPrenom() {
        return this.prenom;
    }
    getEmail() {
        return this.email;
    }
    getAdresse() {
        return this.adresse;
    }
    // Setters
    setNom(nom) {
        this.nom = nom;
    }
    setPrenom(prenom) {
        this.prenom = prenom;
    }
    setEmail(email) {
        this.email = email;
    }
    setAdresse(adresse) {
        this.adresse = adresse;
    }
    /**
     * Convertit la personne en objet plain
     */
    toObject() {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            adresse: this.adresse
        };
    }
}
