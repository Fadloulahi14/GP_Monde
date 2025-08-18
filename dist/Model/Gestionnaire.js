import { Personne } from './Personne';
export class Gestionnaire extends Personne {
    constructor(id, nom, prenom, email, adresse, login, password) {
        super(id, nom, prenom, email, adresse);
        this.login = login;
        this.password = password;
    }
    getLogin() {
        return this.login;
    }
    setLogin(login) {
        this.login = login;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    verifyPassword(password) {
        return this.password === password;
    }
}
