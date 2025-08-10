import { Personne } from './Personne';

export class Gestionnaire extends Personne {
    private login: string;
    private password: string;

    constructor(
        id: string,
        nom: string,
        prenom: string,
        email: string,
        adresse: string,
        login: string,
        password: string
    ) {
        super(id, nom, prenom, email, adresse);
        this.login = login;
        this.password = password;
    }

    public getLogin(): string {
        return this.login;
    }

    public setLogin(login: string): void {
        this.login = login;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public verifyPassword(password: string): boolean {
        return this.password === password;
    }
}
