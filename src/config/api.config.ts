export const API_CONFIG = {
    baseUrl: 'http://localhost:3000',
    endpoints: {
        colis: '/colis',
        cargaisons: '/cargaisons',
        personnes: '/personnes',
        clients: '/clients',
        gestionnaires: '/gestionnaires',
        enums: '/enums',
        produitsAlimentaires: '/produitsAlimentaires',
        produitsChimiques: '/produitsChimiques',
        produitsMateriels: '/produitsMateriels'
    }
};


export class ApiService {
    private static baseUrl: string = API_CONFIG.baseUrl;
    private static endpoints = API_CONFIG.endpoints;

    static getUrl(endpoint: keyof typeof API_CONFIG.endpoints): string {
        return `${this.baseUrl}${this.endpoints[endpoint]}`;
    }

    static getFullUrl(endpoint: keyof typeof API_CONFIG.endpoints, id?: string): string {
        const base = this.getUrl(endpoint);
        return id ? `${base}/${id}` : base;
    }

    static getUrlWithQuery(endpoint: keyof typeof API_CONFIG.endpoints, params: Record<string, string>): string {
        const baseUrl = this.getUrl(endpoint);
        const searchParams = new URLSearchParams(params);
        return `${baseUrl}?${searchParams.toString()}`;
    }
}