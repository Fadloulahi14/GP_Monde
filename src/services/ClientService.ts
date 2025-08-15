export class ClientService {
    private apiBase = "http://localhost:3000";

    async getClients(): Promise<any[]> {
        const res = await fetch(`${this.apiBase}/clients`);
        return res.json();
    }

    async getPersonnes(): Promise<any[]> {
        const res = await fetch(`${this.apiBase}/personnes`);
        return res.json();
    }

    async getColis(): Promise<any[]> {
        const res = await fetch(`${this.apiBase}/colis`);
        return res.json();
    }
}
