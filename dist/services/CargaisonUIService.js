export class CargaisonUIService {
    cargaisonService;
    tbody;
    searchInput;
    cargaisons = [];
    constructor(cargaisonService, tbodySelector, searchInputSelector) {
        this.cargaisonService = cargaisonService;
        this.tbody = document.querySelector(tbodySelector);
        this.searchInput = document.querySelector(searchInputSelector);
    }
    getEtatClass(etat) {
        switch (etat) {
            case 'en_cours': return 'bg-blue-100 text-blue-800';
            case 'annuler': return 'bg-red-100 text-red-800';
            case 'termine': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    createRow(c) {
        const trajet = c.getTrajet();
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c["id"]}</td>
            <td>${c.getPoidsTotal()} kg</td>
            <td>${trajet.getDepart().ville} → ${trajet.getArrivee().ville}</td>
            <td>${c.getNombreTotalColis()}</td>
            <td><span class="${this.getEtatClass(c.getEtatGlobal())}">${c.getEtatGlobal()}</span></td>
            <td>${c.getPrixTotal().toLocaleString()} FCFA</td>
            <td>
                <button data-action="voir" data-id="${c["id"]}">Voir</button>
                <button data-action="modifier" data-id="${c["id"]}">Modifier</button>
            </td>
        `;
        return tr;
    }
    render(cargaisons) {
        this.tbody.innerHTML = '';
        cargaisons.forEach(c => this.tbody.appendChild(this.createRow(c)));
    }
    async init() {
        try {
            this.cargaisons = await this.cargaisonService.getAll();
            this.render(this.cargaisons);
            this.searchInput.addEventListener('input', () => {
                const filtered = this.cargaisonService.filter(this.cargaisons, this.searchInput.value);
                this.render(filtered);
            });
        }
        catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    }
}
