export abstract class Personne {
    protected id: string;
    protected nom: string;
    protected prenom: string;
    protected email: string;
    protected adresse: string;

    constructor(
        id: string,
        nom: string,
        prenom: string,
        email: string,
        adresse: string
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.adresse = adresse;
    }

    // Getters
    public getId(): string {
        return this.id;
    }

    public getNom(): string {
        return this.nom;
    }

    public getPrenom(): string {
        return this.prenom;
    }

    public getEmail(): string {
        return this.email;
    }

    public getAdresse(): string {
        return this.adresse;
    }

    // Setters
    public setNom(nom: string): void {
        this.nom = nom;
    }

    public setPrenom(prenom: string): void {
        this.prenom = prenom;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setAdresse(adresse: string): void {
        this.adresse = adresse;
    }

    /**
     * Convertit la personne en objet plain
     */
    public toObject(): Record<string, any> {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            adresse: this.adresse
        };
    }
}
