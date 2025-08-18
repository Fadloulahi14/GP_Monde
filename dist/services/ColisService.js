import { Colis } from "../Model/Colis.js";
import { ApiService } from "../config/api.config.js";
export class ColisService {
    constructor() {
        this.apiUrl = ApiService.getUrl('colis');
    }
    async getAll() {
        const response = await fetch(this.apiUrl);
        if (!response.ok)
            throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        return data.map((c) => this.mapToColis(c));
    }
    async createColis(formData) {
        var _a;
        const colisData = {
            id: `COL-${Date.now()}`,
            code_suivi: this.generateCodeSuivi(),
            Type_cargaison: formData.get('typeProduit'),
            Poids: parseFloat(((_a = formData.get('poids')) === null || _a === void 0 ? void 0 : _a.toString()) || "0"),
            expediteur: `${formData.get('expediteurNom')} (${formData.get('expediteurTel')})`,
            destinataire: `${formData.get('destinataireNom')} (${formData.get('destinataireTel')})`,
            cargaisonId: formData.get('cargaisonId'),
            etat: "en_attente"
        };
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(colisData)
        });
        if (!response.ok)
            throw new Error(`Erreur HTTP: ${response.status}`);
        return this.mapToColis(await response.json());
    }
    mapToColis(c) {
        return new Colis(c.id, c.code_suivi || this.generateCodeSuivi(), c.Type_cargaison, c.Poids, c.expediteur, c.destinataire, c.etat, c.cargaisonId);
    }
    generateCodeSuivi() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = '';
        for (let i = 0; i < 2; i++)
            code += letters[Math.floor(Math.random() * letters.length)];
        for (let i = 0; i < 6; i++)
            code += numbers[Math.floor(Math.random() * numbers.length)];
        return code;
    }
}
