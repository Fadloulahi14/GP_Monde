export declare const API_CONFIG: {
    baseUrl: string;
    endpoints: {
        colis: string;
        cargaisons: string;
        personnes: string;
        clients: string;
        gestionnaires: string;
        enums: string;
        produitsAlimentaires: string;
        produitsChimiques: string;
        produitsMateriels: string;
    };
};
export declare class ApiService {
    private static baseUrl;
    private static endpoints;
    static getUrl(endpoint: keyof typeof API_CONFIG.endpoints): string;
    static getFullUrl(endpoint: keyof typeof API_CONFIG.endpoints, id?: string): string;
    static getUrlWithQuery(endpoint: keyof typeof API_CONFIG.endpoints, params: Record<string, string>): string;
}
