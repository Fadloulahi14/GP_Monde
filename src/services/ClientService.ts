import { ApiService } from "../config/api.config.js";

interface Personne {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
}

interface Client {
    id: string;
    personneId: string;
}

interface Colis {
    id: string;
    clientId: number;
    expediteur: string;
    code_suivi: string;
    Type_cargaison: string;
    etat: string;
}

export class ClientService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = ApiService.getUrl('clients');
    }

    async getClients(): Promise<Client[]> {
        const res = await fetch(ApiService.getUrl('clients'));
        return res.json();
    }

    async getPersonnes(): Promise<Personne[]> {
        const res = await fetch(ApiService.getUrl('personnes'));
        return res.json();
    }

    async getColis(): Promise<Colis[]> {
        const res = await fetch(ApiService.getUrl('colis'));
        return res.json();
    }

    async getClientDetails(clientId: string): Promise<any> {
        const [client, colis] = await Promise.all([
            this.getClientById(clientId),
            this.getColisByClientId(clientId)
        ]);
        return { ...client, colis };
    }

    private async getClientById(clientId: string): Promise<any> {
        const clients = await this.getClients();
        const personnes = await this.getPersonnes();
        const client = clients.find(c => c.id === clientId);
        const personne = personnes.find(p => p.id === client?.personneId);
        return { ...client, ...personne };
    }

    private async getColisByClientId(clientId: string): Promise<Colis[]> {
        const colis = await this.getColis();
        return colis.filter(c => c.clientId === parseInt(clientId));
    }
}
