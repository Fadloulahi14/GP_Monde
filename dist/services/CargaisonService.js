import { Cargaison } from "../Model/Cargaison.js";
import { ApiService } from "../config/api.config.js";
export class CargaisonService {
    constructor() {
        this.apiUrl = ApiService.getUrl('cargaisons');
    }
    async getAll(page = 1, limit = 7) {
        const response = await fetch(this.apiUrl);
        if (!response.ok)
            throw new Error(`Erreur HTTP : ${response.status}`);
        const cargaisonsData = await response.json();
        cargaisonsData.sort((a, b) => {
            return new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime();
        });
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = cargaisonsData.slice(startIndex, endIndex);
        const colisResponse = await fetch(ApiService.getUrl('colis'));
        const colis = colisResponse.ok ? await colisResponse.json() : [];
        const cargaisons = paginatedData.map((data) => {
            const colisCargaison = colis.filter((c) => c.cargaisonId === data.id);
            const poidsTotal = colisCargaison.reduce((total, c) => total + (c.Poids || 0), 0);
            const prixTotal = colisCargaison.reduce((total, c) => {
                const prixCalcule = (c.Poids || 0) * 500;
                return total + Math.max(prixCalcule, 10000);
            }, 0);
            return Cargaison.fromObject(Object.assign(Object.assign({}, data), { poids_total: poidsTotal, prix_total: prixTotal, colis: colisCargaison }));
        });
        return {
            cargaisons,
            total: cargaisonsData.length
        };
    }
    filter(cargaisons, searchTerm) {
        const term = searchTerm.toLowerCase();
        return cargaisons.filter(c => {
            const trajet = c.getTrajet();
            return (String(c["id"]).toLowerCase().includes(term) ||
                trajet.getDepart().ville.toLowerCase().includes(term) ||
                trajet.getArrivee().ville.toLowerCase().includes(term) ||
                c.getEtatGlobal().toLowerCase().includes(term));
        });
    }
    async create(formData) {
        // Validation des données
        const poidsMax = parseFloat(formData.get('poidsMax')) || 0;
        const lieuDepart = formData.get('lieuDepart');
        const lieuArrivee = formData.get('lieuArrivee');
        const type = formData.get('type');
        if (poidsMax <= 0) {
            throw new Error('Le poids maximum doit être supérieur à 0');
        }
        if (!lieuDepart || !lieuArrivee) {
            throw new Error('Les lieux de départ et d\'arrivée sont requis');
        }
        if (!type) {
            throw new Error('Le type de cargaison est requis');
        }
        const newCargaison = {
            id: formData.get('numero') || `CARG-${Date.now()}`,
            trajet: {
                depart: {
                    ville: lieuDepart,
                    lat: 0,
                    lng: 0
                },
                arrivee: {
                    ville: lieuArrivee,
                    lat: 0,
                    lng: 0
                }
            },
            type: type,
            poids_max: poidsMax,
            poids_total: 0,
            colis: [],
            etat_global: 'ouvert',
            etat_avance: 'pending',
            distance: 0,
            prix_total: 0,
            date_creation: new Date().toISOString()
        };
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCargaison)
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }
    async getColisDisponibles() {
        const response = await fetch(ApiService.getUrl('colis'));
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const allColis = await response.json();
        // Retourner seulement les colis sans cargaison assignée
        return allColis.filter((colis) => !colis.cargaisonId);
    }
    async fermerCargaison(cargaisonId) {
        const response = await fetch(ApiService.getFullUrl('cargaisons', cargaisonId), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                etat_global: 'ferme',
                etat_avance: 'ready'
            })
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
    }
    async rouvrirCargaison(cargaisonId) {
        // Une cargaison ne peut être rouverte que si elle est EN_ATTENTE
        const cargaison = await this.getById(cargaisonId);
        if (!cargaison) {
            throw new Error('Cargaison non trouvée');
        }
        if (cargaison.etat_avance !== 'pending') {
            throw new Error('Une cargaison ne peut être rouverte que si elle est EN ATTENTE');
        }
        const response = await fetch(`${this.apiUrl}/cargaisons/${cargaisonId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                etat_global: 'ouvert'
            })
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
    }
    async getById(id) {
        try {
            const response = await fetch(ApiService.getFullUrl('cargaisons', id));
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        }
        catch (error) {
            console.error('Erreur lors de la récupération de la cargaison:', error);
            throw error;
        }
    }
    async addColisToCargaison(cargaisonId, colisId) {
        const response = await fetch(`${this.apiUrl}/colis/${colisId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cargaisonId })
        });
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
    }
    async updateStatus(cargaisonId, newStatus) {
        try {
            const cargaisonResponse = await fetch(ApiService.getFullUrl('cargaisons', cargaisonId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    etat_global: newStatus
                })
            });
            if (!cargaisonResponse.ok)
                throw new Error(`HTTP error! status: ${cargaisonResponse.status}`);
            const colisResponse = await fetch(`${ApiService.getUrl('colis')}?cargaisonId=${cargaisonId}`);
            const colis = await colisResponse.json();
            const updatePromises = colis.map(async (colis) => {
                let colisStatus = '';
                switch (newStatus) {
                    case 'en_cours':
                        colisStatus = 'en_cours';
                        break;
                    case 'arriver':
                        colisStatus = 'arriver';
                        break;
                    case 'recuperer':
                        colisStatus = 'recuperer';
                        break;
                    case 'annuler':
                        colisStatus = 'annuler';
                        break;
                    case 'archiver':
                        colisStatus = 'archiver';
                        break;
                    case 'perdu':
                        colisStatus = 'perdu';
                        break;
                    default:
                        colisStatus = 'en_attente';
                }
                // Mettre à jour l'état du colis
                return fetch(ApiService.getFullUrl('colis', colis.id), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        etat: colisStatus
                    })
                });
            });
            // Attendre que toutes les mises à jour soient terminées
            await Promise.all(updatePromises);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour des états:', error);
            throw error;
        }
    }
}
