import { ApiService } from "../config/api.config.js";
import { Cargaison } from "../Model/Cargaison.js";
import { CargaisonService } from "./CargaisonService.js";

// Déclaration des types pour Leaflet
declare const L: any;

interface Coordinates {
    lat: number;
    lon: number;
}

interface ColisDetail {
    id: string;
    code_suivi: string;
    Poids: number;
    expediteur: string;
    destinataire: string;
    etat: string;
    Type_cargaison: string;
    cargaisonId?: string;
}

export class CargaisonUIService {
    private cargaisonService: CargaisonService;
    private tbody: HTMLTableSectionElement;
    private searchInput: HTMLInputElement;
    private cargaisons: Cargaison[] = [];
    private map: any = null;
    private marker1: any = null;
    private marker2: any = null;
    private routeLine: any = null;
    private currentPage: number = 1;
    private totalPages: number = 1;

    constructor(cargaisonService: CargaisonService, tbodySelector: string, searchInputSelector: string) {
        this.cargaisonService = cargaisonService;
        this.tbody = document.querySelector(tbodySelector) as HTMLTableSectionElement;
        this.searchInput = document.querySelector(searchInputSelector) as HTMLInputElement;
    }

    private getEtatClass(etat: string): string {
        switch (etat) {
            case 'en_cours': return 'bg-blue-100 text-blue-800';
            case 'annuler': return 'bg-red-100 text-red-800';
            case 'termine': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    private createRow(c: Cargaison): HTMLTableRowElement {
        const trajet = c.getTrajet();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${c["id"]}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.getPoidsTotal()} kg</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${trajet.getDepart().ville} → ${trajet.getArrivee().ville}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.getNombreTotalColis()}</td>
            <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getEtatClass(c.getEtatGlobal())}">${c.getEtatGlobal()}</span></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.getPrixTotal().toLocaleString()} FCFA</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="voirCargaison('${c["id"]}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Voir</button>
                <button onclick="fermerCargaison('${c["id"]}')" class="text-red-600 hover:text-red-900">Fermer</button>
            </td>
        `;
        return tr;
    }

    private render(cargaisons: Cargaison[]) {
        this.tbody.innerHTML = '';
        cargaisons.forEach(c => this.tbody.appendChild(this.createRow(c)));
    }

    private initializeMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        this.map = L.map('map').setView([14.6937, -17.4441], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    async calculateRoute(depart: string, arrivee: string) {
        try {
            if (this.marker1) this.map.removeLayer(this.marker1);
            if (this.marker2) this.map.removeLayer(this.marker2);
            if (this.routeLine) this.map.removeLayer(this.routeLine);

            const departCoords = await this.geocode(depart);
            const arriveeCoords = await this.geocode(arrivee);

            if (!departCoords || !arriveeCoords) {
                throw new Error('Impossible de trouver les coordonnées');
            }

            this.marker1 = L.marker([departCoords.lat, departCoords.lon])
                .bindPopup(depart)
                .addTo(this.map);

            this.marker2 = L.marker([arriveeCoords.lat, arriveeCoords.lon])
                .bindPopup(arrivee)
                .addTo(this.map);

            this.routeLine = L.polyline([
                [departCoords.lat, departCoords.lon],
                [arriveeCoords.lat, arriveeCoords.lon]
            ], {color: 'red'}).addTo(this.map);

            
            this.map.fitBounds(this.routeLine.getBounds(), {padding: [50, 50]});

           
            const distance = this.calculateDistance(
                departCoords.lat, departCoords.lon,
                arriveeCoords.lat, arriveeCoords.lon
            );

            return {
                distance: Math.round(distance),
                duree: Math.round(distance / 80) + 'h'
            };

        } catch (error) {
            console.error('Erreur lors du calcul du trajet:', error);
            throw error;
        }
    }

    private async geocode(address: string): Promise<Coordinates | null> {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();
            
            if (data && data[0]) {
                return {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon)
                };
            }
            return null;
        } catch (error) {
            console.error('Erreur de géocodage:', error);
            return null;
        }
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Rayon de la Terre en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI/180);
    }

    async init() {
        try {
            const {cargaisons, total} = await this.cargaisonService.getAll(this.currentPage);
            this.totalPages = Math.ceil(total / 7);
            this.render(cargaisons);
            
            // Mettre à jour la pagination
            const paginationContainer = document.getElementById('pagination-container');
            if (paginationContainer) {
                paginationContainer.innerHTML = this.createPagination();
            }

            this.searchInput.addEventListener('input', () => {
                const filtered = this.cargaisonService.filter(this.cargaisons, this.searchInput.value);
                this.render(filtered);
            });
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    }

    private createPagination(): string {
        const totalPages = Math.ceil(this.totalPages);
        
        return `
            <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                    <button onclick="changePage(${this.currentPage - 1})" 
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${this.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${this.currentPage <= 1 ? 'disabled' : ''}>
                        Précédent
                    </button>
                    <button onclick="changePage(${this.currentPage + 1})"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${this.currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${this.currentPage >= totalPages ? 'disabled' : ''}>
                        Suivant
                    </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Affichage de la page <span class="font-medium">${this.currentPage}</span> sur <span class="font-medium">${totalPages}</span>
                        </p>
                    </div>
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button onclick="changePage(${this.currentPage - 1})"
                                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${this.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                                    ${this.currentPage <= 1 ? 'disabled' : ''}>
                                <span class="sr-only">Précédent</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button onclick="changePage(${this.currentPage + 1})"
                                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${this.currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                                    ${this.currentPage >= totalPages ? 'disabled' : ''}>
                                <span class="sr-only">Suivant</span>
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        `;
    }

    private async showCargaisonDetails(cargaisonId: string) {
        try {
            const cargaison = await this.cargaisonService.getById(cargaisonId);
            if (!cargaison) throw new Error('Cargaison non trouvée');

            // Utiliser ApiService pour construire l'URL
            const colisResponse = await fetch(ApiService.getUrlWithQuery('colis', { cargaisonId }));
            if (!colisResponse.ok) throw new Error(`HTTP error! status: ${colisResponse.status}`);
            const colis = await colisResponse.json();

            const modalId = `cargaison-details-${cargaisonId}`;
            const oldModal = document.getElementById(modalId);
            if (oldModal) oldModal.remove();

            const modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';

            // Reste du code pour la création du modal
            modal.innerHTML = `
                <div class="relative top-20 mx-auto p-5 w-full max-w-4xl">
                    <div class="relative bg-white rounded-lg shadow-xl">
                        <!-- En-tête -->
                        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Détails de la cargaison ${cargaison.id}
                            </h3>
                            <button type="button" class="close-modal-btn text-gray-400 hover:text-gray-500">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Corps -->
                        <div class="p-6">
                            <form id="cargaison-status-form-${cargaisonId}" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Informations de base -->
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <h4 class="text-sm font-medium text-gray-900 mb-4">Informations générales</h4>
                                        <div class="space-y-4">
                                            <div>
                                                <p class="text-sm font-medium text-gray-500">État actuel</p>
                                                <select id="cargaison-status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                    ${['en_attente', 'en_cours', 'arriver', 'recuperer', 'perdu', 'annuler', 'archiver']
                                                        .map(status => `<option value="${status}" ${cargaison.etat_global === status ? 'selected' : ''}>${status}</option>`)}
                                                </select>
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-500">Nombre de colis</p>
                                                <p class="mt-1 text-lg font-semibold">${colis.length}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Statistiques -->
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <h4 class="text-sm font-medium text-blue-900 mb-4">Statistiques</h4>
                                        <div class="space-y-4">
                                            <div>
                                                <p class="text-sm font-medium text-gray-500">Poids total</p>
                                                <p class="mt-1 text-lg font-semibold">${cargaison.poids_total} kg</p>
                                            </div>
                                            <div>
                                                <p class="text-sm font-medium text-gray-500">Distance</p>
                                                <p class="mt-1 text-lg font-semibold">${cargaison.trajet?.distance || 0} km</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Liste des colis -->
                                <div class="mt-6">
                                    <h4 class="text-lg font-medium mb-4">Liste des colis</h4>
                                    <div class="bg-white shadow overflow-hidden rounded-md">
                                        <ul class="divide-y divide-gray-200">
                                            ${colis.map((c: ColisDetail) => `
                                                <li class="p-4 hover:bg-gray-50">
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0">
                                                                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                                </svg>
                                                            </div>
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">${c.code_suivi}</div>
                                                                <div class="text-sm text-gray-500">${c.Poids} kg</div>
                                                            </div>
                                                        </div>
                                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${this.getEtatClass(c.etat)}">
                                                            ${c.etat}
                                                        </span>
                                                    </div>
                                                    <div class="mt-2 text-sm text-gray-500">
                                                        <p>Expéditeur: ${c.expediteur}</p>
                                                        <p>Destinataire: ${c.destinataire}</p>
                                                    </div>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <!-- Boutons d'action -->
                                <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <button type="button" 
                                            class="cancel-modal-btn px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                        Annuler
                                    </button>
                                    <button type="submit" 
                                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Appliquer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Gérer les événements
            this.attachModalEvents(modal, modalId, cargaisonId);

        } catch (error) {
            console.error('Erreur lors du chargement des détails:', error);
            alert('Erreur lors du chargement des détails de la cargaison');
        }
    }

    private closeDetailsModal(modalId: string) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.remove();
            // Vérifier si d'autres modals sont ouverts
            const otherModals = document.querySelectorAll('.fixed');
            if (otherModals.length === 0) {
                // Réactiver le scroll si nécessaire
                document.body.style.overflow = 'auto';
            }
        }
    }

    async changePage(newPage: number) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            await this.init();
        }
    }

    private attachModalEvents(modal: HTMLElement, modalId: string, cargaisonId: string) {
        // Gérer les événements avec querySelector et addEventListener
        const closeButton = modal.querySelector('.close-modal-btn') as HTMLButtonElement;
        const cancelButton = modal.querySelector('.cancel-modal-btn') as HTMLButtonElement;
        
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeDetailsModal(modalId);
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeDetailsModal(modalId);
            });
        }

        // Gérer la soumission du formulaire
        const form = document.getElementById(`cargaison-status-form-${cargaisonId}`) as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const statusSelect = form.querySelector('#cargaison-status') as HTMLSelectElement;
                if (statusSelect) {
                    try {
                        await this.cargaisonService.updateStatus(cargaisonId, statusSelect.value);
                        this.closeDetailsModal(modalId);
                        await this.init();
                    } catch (error) {
                        console.error('Erreur lors de la mise à jour:', error);
                        alert('Erreur lors de la mise à jour du statut');
                    }
                }
            });
        }
    }
}
