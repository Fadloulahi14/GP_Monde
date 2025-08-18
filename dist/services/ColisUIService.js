export class ColisUIService {
    constructor(colisService, tbodySelector, searchInputSelector) {
        this.colisService = colisService;
        this.tbody = document.querySelector(tbodySelector);
        this.searchInput = document.querySelector(searchInputSelector);
    }
    async init() {
        try {
            const colis = await this.colisService.getAll();
            this.renderColis(colis);
            this.setupSearch();
            this.setupForm();
        }
        catch (error) {
            console.error("Erreur d'initialisation:", error);
        }
    }
    renderColis(colis) {
        if (!this.tbody)
            return;
        this.tbody.innerHTML = colis.map(c => `
            <tr class="hover:bg-gray-50">
                <td class="px-3 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium text-gray-900">${c.getCodeSuivi()}</div>
                        </div>
                    </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${c.getTypeProduit()}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${c.getPoidsTotal()} kg
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${c.getExpediteur()}</div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${c.getDestinataire()}</div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getEtatClass(c.getEtat())}">
                        ${c.getEtat()}
                    </span>
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${c.getCargaison() || 'Non assigné'}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm">
                    <button onclick="voirColis('${c.getId()}')" 
                            class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    setupForm() {
        const form = document.getElementById('new-colis-form');
        if (!form)
            return;
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData(form);
                await this.colisService.createColis(formData);
                const colis = await this.colisService.getAll();
                this.renderColis(colis);
                form.reset();
                window.closeColisModal(); // Utilisation de window.closeColisModal
            }
            catch (error) {
                console.error("Erreur lors de la création:", error);
                alert("Erreur lors de la création du colis");
            }
        });
    }
    setupSearch() {
        if (!this.searchInput)
            return;
        this.searchInput.addEventListener('input', async (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allColis = await this.colisService.getAll();
            const filteredColis = allColis.filter(colis => colis.getCodeSuivi().toLowerCase().includes(searchTerm) ||
                colis.getExpediteur().toLowerCase().includes(searchTerm) ||
                colis.getDestinataire().toLowerCase().includes(searchTerm));
            this.renderColis(filteredColis);
        });
    }
    getEtatClass(etat) {
        const classes = {
            'en_cours': 'bg-blue-100 text-blue-800',
            'en_attente': 'bg-yellow-100 text-yellow-800',
            'arriver': 'bg-green-100 text-green-800',
            'annuler': 'bg-red-100 text-red-800',
            'archiver': 'bg-gray-100 text-gray-800'
        };
        return classes[etat] || 'bg-gray-100 text-gray-800';
    }
}
