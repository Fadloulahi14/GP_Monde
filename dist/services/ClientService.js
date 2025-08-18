import { ApiService } from "../config/api.config.js";
export class ClientService {
    constructor() {
        this.apiUrl = ApiService.getUrl('clients');
    }
    async getClients() {
        const res = await fetch(ApiService.getUrl('clients'));
        return res.json();
    }
    async getPersonnes() {
        const res = await fetch(ApiService.getUrl('personnes'));
        return res.json();
    }
    async getColis() {
        const res = await fetch(ApiService.getUrl('colis'));
        return res.json();
    }
    async getClientDetails(clientId) {
        const [client, colis] = await Promise.all([
            this.getClientById(clientId),
            this.getColisByClientId(clientId)
        ]);
        return Object.assign(Object.assign({}, client), { colis });
    }
    async getClientById(clientId) {
        const clients = await this.getClients();
        const personnes = await this.getPersonnes();
        const client = clients.find(c => c.id === clientId);
        const personne = personnes.find(p => p.id === (client === null || client === void 0 ? void 0 : client.personneId));
        return Object.assign(Object.assign({}, client), personne);
    }
    async getColisByClientId(clientId) {
        const colis = await this.getColis();
        return colis.filter(c => c.clientId === parseInt(clientId));
    }
}
