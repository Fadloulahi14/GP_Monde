import { Personne } from './Personne';
export declare class Gestionnaire extends Personne {
    private login;
    private password;
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string, login: string, password: string);
    getLogin(): string;
    setLogin(login: string): void;
    getPassword(): string;
    setPassword(password: string): void;
    verifyPassword(password: string): boolean;
}
