import { Cargaison } from "../Model/Cargaison.js";

export class CargaisonService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getAll(): Promise<Cargaison[]> {
        const response = await fetch(`${this.apiUrl}/cargaisons`);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const cargaisonsData = await response.json();
        return cargaisonsData.map((data: any) => Cargaison.fromObject(data));
    }

    filter(cargaisons: Cargaison[], searchTerm: string): Cargaison[] {
        const term = searchTerm.toLowerCase();
        return cargaisons.filter(c => {
            const trajet = c.getTrajet();
            return (
                String(c["id"]).toLowerCase().includes(term) ||
                trajet.getDepart().ville.toLowerCase().includes(term) ||
                trajet.getArrivee().ville.toLowerCase().includes(term) ||
                c.getEtatGlobal().toLowerCase().includes(term)
            );
        });
    }

    async create(formData: FormData): Promise<any> {
        const newCargaison = {
            id: formData.get('numero') || `CARG-${Date.now()}`,
            trajet: {
                depart: {
                    ville: formData.get('lieuDepart'),
                    lat: 0,
                    lng: 0
                },
                arrivee: {
                    ville: formData.get('lieuArrivee'),
                    lat: 0,
                    lng: 0
                }
            },
            type: formData.get('type'),
            poids_max: parseFloat(formData.get('poidsMax') as string) || 0,
            colis: [],
            etat_global: 'ouvert',
            etat_avance: 'pending',
            distance: 0,
            prix_total: 0
        };

        const response = await fetch(`${this.apiUrl}/cargaisons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCargaison)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }

    async addColisToCargaison(cargaisonId: string, colisId: string): Promise<void> {
        const response = await fetch(`${this.apiUrl}/colis/${colisId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cargaisonId })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    }
}
