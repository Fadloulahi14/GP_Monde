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
    static getUrl(endpoint) {
        return `${this.baseUrl}${this.endpoints[endpoint]}`;
    }
    static getFullUrl(endpoint, id) {
        const base = this.getUrl(endpoint);
        return id ? `${base}/${id}` : base;
    }
    static getUrlWithQuery(endpoint, params) {
        const baseUrl = this.getUrl(endpoint);
        const searchParams = new URLSearchParams(params);
        return `${baseUrl}?${searchParams.toString()}`;
    }
}
ApiService.baseUrl = API_CONFIG.baseUrl;
ApiService.endpoints = API_CONFIG.endpoints;
