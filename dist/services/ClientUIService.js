import { ClientService } from './ClientService.js';
export class ClientUIService {
    constructor() {
        this.service = new ClientService();
    }
    async loadClients(containerId) {
        try {
            const container = document.getElementById(containerId);
            if (!container)
                return;
            const colis = await this.service.getColis();
            // Regrouper les colis par expéditeur en filtrant ceux qui n'ont pas d'expéditeur
            const expediteurs = colis
                .filter(col => col.expediteur) // Filtrer les colis sans expéditeur
                .reduce((acc, col) => {
                const expediteur = col.expediteur;
                if (!acc[expediteur]) {
                    // Extraire le nom et le téléphone de l'expéditeur du format "nom (téléphone)"
                    const match = expediteur.match(/(.*?)\s*\((\d+)\)/);
                    const [_, nom, tel] = match || [null, expediteur, ''];
                    acc[expediteur] = {
                        expediteur: nom || expediteur,
                        tel: tel || 'Non spécifié',
                        nbColis: 0,
                        colis: [],
                        clientId: col.id
                    };
                }
                acc[expediteur].nbColis++;
                acc[expediteur].colis.push(col);
                return acc;
            }, {});
            const expediteursData = Object.values(expediteurs);
            if (expediteursData.length === 0) {
                container.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                            Aucun expéditeur trouvé
                        </td>
                    </tr>
                `;
                return;
            }
            container.innerHTML = expediteursData
                .map((exp) => this.generateClientRow(exp))
                .join('');
            this.attachViewDetailsEvents(expediteursData);
        }
        catch (error) {
            console.error('Erreur lors du chargement des expéditeurs:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-red-500">
                            Erreur lors du chargement des expéditeurs
                        </td>
                    </tr>
                `;
            }
        }
    }
    attachViewDetailsEvents(expediteursData) {
        const voirClient = (clientId) => {
            var _a;
            const expediteur = expediteursData.find(e => e.clientId === clientId);
            if (!expediteur)
                return;
            const modalContent = document.getElementById('clientDetailContent');
            if (!modalContent)
                return;
            modalContent.innerHTML = this.generateExpediteurDetails(expediteur);
            (_a = document.getElementById('clientDetailModal')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        };
        const closeClientModal = () => {
            var _a;
            (_a = document.getElementById('clientDetailModal')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        };
        window.voirClient = voirClient;
        window.closeClientModal = closeClientModal;
    }
    generateExpediteurDetails(expediteur) {
        return `
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">Détails de l'expéditeur</h2>
                    <button onclick="closeClientModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mb-6">
                    <p class="text-gray-600">Nom: ${expediteur.expediteur}</p>
                    <p class="text-gray-600">Téléphone: ${expediteur.tel || 'Non spécifié'}</p>
                    <p class="text-gray-600">Email: ${expediteur.email || 'Non spécifié'}</p>
                    <p class="text-gray-600">Adresse: ${expediteur.adresse || 'Non spécifié'}</p>
                    <p class="text-gray-600">Nombre de colis: ${expediteur.nbColis}</p>
                </div>
                <div class="mt-4">
                    <h3 class="font-semibold mb-2">Liste des colis</h3>
                    <div class="space-y-2">
                        ${this.generateColisList(expediteur.colis)}
                    </div>
                </div>
            </div>
        `;
    }
    generateColisList(colis) {
        if (!colis.length)
            return '<p class="text-gray-500">Aucun colis</p>';
        return colis.map(c => `
            <div class="p-3 bg-gray-50 rounded-lg">
                <p class="font-medium">Code suivi: ${c.code_suivi}</p>
                <p class="text-sm text-gray-600">Type: ${c.Type_cargaison}</p>
                <p class="text-sm text-gray-600">État: ${c.etat}</p>
            </div>
        `).join('');
    }
    generateClientRow(expediteur) {
        const initial = expediteur.expediteur ? expediteur.expediteur.charAt(0).toUpperCase() : 'E';
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-800 font-medium">${initial}</span>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${expediteur.expediteur || 'Non spécifié'}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">${expediteur.tel || 'Non spécifié'}</div>
                    <div class="text-sm text-gray-500">${expediteur.email || 'Pas d\'email'}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">${expediteur.adresse || 'Non spécifié'}</div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${expediteur.nbColis} colis
                    </span>
                </td>
                <td class="px-6 py-4 text-sm">
                    <button onclick="voirClient('${expediteur.clientId}')" 
                            class="text-blue-600 hover:text-blue-900 mr-3">
                        Voir détails
                    </button>
                </td>
            </tr>
        `;
    }
    attachSearch(searchInputId, containerId) {
        const searchInput = document.getElementById(searchInputId);
        if (!searchInput)
            return;
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll(`#${containerId} tr`);
            rows.forEach(row => {
                var _a;
                const text = ((_a = row.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}
