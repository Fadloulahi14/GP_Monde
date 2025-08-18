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
export declare class ClientService {
    private apiUrl;
    constructor();
    getClients(): Promise<Client[]>;
    getPersonnes(): Promise<Personne[]>;
    getColis(): Promise<Colis[]>;
    getClientDetails(clientId: string): Promise<any>;
    private getClientById;
    private getColisByClientId;
}
export {};
