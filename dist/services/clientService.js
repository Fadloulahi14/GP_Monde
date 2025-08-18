export class ClientService {
    apiBase = "http://localhost:3000";
    async getClients() {
        const res = await fetch(`${this.apiBase}/clients`);
        return res.json();
    }
    async getPersonnes() {
        const res = await fetch(`${this.apiBase}/personnes`);
        return res.json();
    }
    async getColis() {
        const res = await fetch(`${this.apiBase}/colis`);
        return res.json();
    }
}
