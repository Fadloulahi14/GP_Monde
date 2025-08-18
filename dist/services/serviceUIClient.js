import { ClientService } from "./clientService.js";
export class ServiceUIClient {
    clientService;
    constructor() {
        this.clientService = new ClientService();
    }
    async loadClients(tbodyId) {
        try {
            const [clients, personnes, colis] = await Promise.all([
                this.clientService.getClients(),
                this.clientService.getPersonnes(),
                this.clientService.getColis()
            ]);
            const tbody = document.getElementById(tbodyId);
            tbody.innerHTML = "";
            for (const client of clients) {
                const personne = personnes.find(p => p.id === client.personneId);
                if (!personne)
                    continue;
                const nombreColis = colis.filter(c => c.clientId === client.id).length;
                const row = this.createClientRow(client, personne, nombreColis);
                tbody.appendChild(row);
            }
            if (window.feather) {
                window.feather.replace();
            }
        }
        catch (error) {
            console.error("Erreur lors du chargement des clients:", error);
            alert("Erreur lors du chargement des clients.");
        }
    }
    createClientRow(client, personne, nombreColis) {
        const tr = document.createElement("tr");
        const statusClass = nombreColis > 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
        const statusText = nombreColis > 0 ? "Actif" : "Inactif";
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-medium text-gray-800">
                ${personne.prenom} ${personne.nom}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
                ${personne.email}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
                ${personne.adresse}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
                ${nombreColis}
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 ${statusClass} text-xs font-medium rounded-full">
                    ${statusText}
                </span>
            </td>
            <td class="px-6 py-4 text-sm">
                <button data-action="view" data-id="${client.id}" class="text-blue-600 hover:text-blue-800 mr-3">
                    Voir
                </button>
                <button data-action="edit" data-id="${client.id}" class="text-gray-600 hover:text-gray-800">
                    Modifier
                </button>
            </td>
        `;
        return tr;
    }
    attachSearch(inputId, tableId) {
        const input = document.getElementById(inputId);
        input?.addEventListener("input", () => {
            const searchTerm = input.value.toLowerCase();
            document.querySelectorAll(`#${tableId} tr`).forEach(row => {
                const text = row.textContent?.toLowerCase() || "";
                row.style.display = text.includes(searchTerm) ? "" : "none";
            });
        });
    }
    attachRowActions(tableId) {
        document.getElementById(tableId)?.addEventListener("click", (e) => {
            const target = e.target;
            if (target.matches("button[data-action]")) {
                const action = target.getAttribute("data-action");
                const id = target.getAttribute("data-id");
                if (action === "view") {
                    console.log("Voir client:", id);
                }
                else if (action === "edit") {
                    console.log("Modifier client:", id);
                }
            }
        });
    }
}
