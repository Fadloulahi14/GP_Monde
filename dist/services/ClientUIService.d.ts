declare global {
    interface Window {
        voirClient: (clientId: string) => void;
        closeClientModal: () => void;
    }
}
export declare class ClientUIService {
    private service;
    constructor();
    loadClients(containerId: string): Promise<void>;
    private attachViewDetailsEvents;
    private generateExpediteurDetails;
    private generateColisList;
    private generateClientRow;
    attachSearch(searchInputId: string, containerId: string): void;
}
