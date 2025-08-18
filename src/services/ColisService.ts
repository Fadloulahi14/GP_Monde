import { Colis } from "../Model/Colis.js";
import { ApiService } from "../config/api.config.js";

export class ColisService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = ApiService.getUrl('colis');
    }

    async getAll(): Promise<Colis[]> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        return data.map((c: any) => this.mapToColis(c));
    }

    async createColis(formData: FormData): Promise<Colis> {
        const colisData = {
            id: `COL-${Date.now()}`,
            code_suivi: this.generateCodeSuivi(),
            Type_cargaison: formData.get('typeProduit'),
            Poids: parseFloat(formData.get('poids')?.toString() || "0"),
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

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return this.mapToColis(await response.json());
    }

    private mapToColis(c: any): Colis {
        return new Colis(
            c.id,
            c.code_suivi || this.generateCodeSuivi(),
            c.Type_cargaison,
            c.Poids,
            c.expediteur,
            c.destinataire,
            c.etat,
            c.cargaisonId
        );
    }

    private generateCodeSuivi(): string {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = '';
        for (let i = 0; i < 2; i++) code += letters[Math.floor(Math.random() * letters.length)];
        for (let i = 0; i < 6; i++) code += numbers[Math.floor(Math.random() * numbers.length)];
        return code;
    }
}
