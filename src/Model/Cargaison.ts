import { EtatGlobal } from './enums/EtatGlobal.js';
import { EtatAvance } from './enums/EtatAvance.js';
import { Trajet } from './Trajet.js';
import { Colis } from './Colis.js';

/**
 * Classe représentant une cargaison
 */
export class Cargaison {
    private poids_total: number;
    private colis: Colis[];
    private trajet: Trajet;
    private etat_global: EtatGlobal;
    private etat_avance: string | EtatAvance;
    private distance: number;
    private prix_total: number;

    /**
     * Constructeur de la classe Cargaison
     */
    constructor(
        private readonly id: string = '',  // Ajout de l'ID
        poids_total: number = 0,
        colis: Colis[] = [],
        trajet: Trajet = new Trajet(),
        etat_global: EtatGlobal = EtatGlobal.OUVERT,
        etat_avance: string | EtatAvance = EtatAvance.PENDING,
        distance: number = 0,
        prix_total: number = 0
    ) {
        this.poids_total = poids_total;
        this.colis = colis;
        this.trajet = trajet;
        this.etat_global = etat_global;
        this.etat_avance = etat_avance;
        this.distance = distance;
        this.prix_total = prix_total;
    }

    /**
     * Obtient le poids total de la cargaison
     */
    public getPoidsTotal(): number {
        return this.poids_total;
    }

    /**
     * Définit le poids total de la cargaison
     */
    public setPoidsTotal(poids_total: number): void {
        if (poids_total < 0) {
            throw new Error("Le poids total ne peut pas être négatif");
        }
        this.poids_total = poids_total;
    }

    /**
     * Obtient la liste des colis
     */
    public getColis(): Colis[] {
        return this.colis;
    }

    /**
     * Définit la liste des colis
     */
    public setColis(colis: Colis[]): void {
        this.colis = colis;
        this.recalculerPoidsTotal();
    }

    /**
     * Obtient le trajet de la cargaison
     */
    public getTrajet(): Trajet {
        return this.trajet;
    }

    /**
     * Définit le trajet de la cargaison
     */
    public setTrajet(trajet: Trajet): void {
        this.trajet = trajet;
    }

    /**
     * Obtient l'état global de la cargaison
     */
    public getEtatGlobal(): EtatGlobal {
        return this.etat_global;
    }

    /**
     * Définit l'état global de la cargaison
     */
    public setEtatGlobal(etat_global: EtatGlobal): void {
        this.etat_global = etat_global;
    }

    /**
     * Obtient l'état d'avancement de la cargaison
     */
    public getEtatAvance(): string | EtatAvance {
        return this.etat_avance;
    }

    /**
     * Définit l'état d'avancement de la cargaison
     */
    public setEtatAvance(etat_avance: string | EtatAvance): void {
        this.etat_avance = etat_avance;
    }

    /**
     * Obtient la distance de la cargaison
     */
    public getDistance(): number {
        return this.distance;
    }

    /**
     * Définit la distance de la cargaison
     */
    public setDistance(distance: number): void {
        if (distance < 0) {
            throw new Error("La distance ne peut pas être négative");
        }
        this.distance = distance;
    }

    /**
     * Obtient le prix total de la cargaison
     */
    public getPrixTotal(): number {
        return this.prix_total;
    }

    /**
     * Définit le prix total de la cargaison
     */
    public setPrixTotal(prix_total: number): void {
        if (prix_total < 0) {
            throw new Error("Le prix total ne peut pas être négatif");
        }
        this.prix_total = prix_total;
    }

    /**
     * Ajoute un colis à la cargaison
     */
    public ajouterColis(colis: Colis): void {
        if (this.etat_global !== EtatGlobal.OUVERT) {
            throw new Error("Impossible d'ajouter un colis à une cargaison fermée");
        }
        if (this.colis.length >= 10) {
            throw new Error("Une cargaison ne peut contenir plus de 10 colis");
        }
        this.colis.push(colis);
        this.recalculerPoidsTotal();
        this.recalculerPrixTotal();
    }

    /**
     * Retire un colis de la cargaison
     */
    public retirerColis(index: number): boolean {
        if (this.etat_global !== EtatGlobal.OUVERT) {
            throw new Error("Impossible de retirer un colis d'une cargaison fermée");
        }
        if (index >= 0 && index < this.colis.length) {
            this.colis.splice(index, 1);
            this.recalculerPoidsTotal();
            return true;
        }
        return false;
    }

    /**
     * Recalcule le poids total basé sur les colis
     */
    private recalculerPoidsTotal(): void {
        this.poids_total = this.colis.reduce((total, colis) => total + colis.getPoidsTotal(), 0);
    }

    /**
     * Recalcule le prix total basé sur les colis (minimum 10.000 FCFA par colis)
     */
    private recalculerPrixTotal(): void {
        const prixParKg = 500; // Prix par kg
        this.prix_total = this.colis.reduce((total, colis) => {
            const prixCalcule = colis.getPoidsTotal() * prixParKg;
            return total + Math.max(prixCalcule, 10000); // Minimum 10.000 FCFA
        }, 0);
    }

    /**
     * Obtient le nombre total de colis
     */
    public getNombreTotalColis(): number {
        return this.colis.length;
    }

    /**
     * Vérifie si la cargaison peut accepter de nouveaux colis
     */
    public peutAccepterColis(): boolean {
        return this.etat_global === EtatGlobal.OUVERT;
    }

    /**
     * Ferme la cargaison (ne peut plus accepter de colis)
     */
    public fermer(): void {
        this.etat_global = EtatGlobal.FERME;
    }

    /**
     * Démarre le transport de la cargaison
     */
    public demarrerTransport(): void {
        if (this.etat_global === EtatGlobal.FERME) {
            this.etat_global = EtatGlobal.EN_COURS;
        } else {
            throw new Error("La cargaison doit être fermée avant de démarrer le transport");
        }
    }

    /**
     * Termine la cargaison
     */
    public terminer(): void {
        this.etat_global = EtatGlobal.TERMINE;
        this.etat_avance = EtatAvance.ARRIVED;
    }

    /**
     * Vérifie si la cargaison peut accepter encore des colis
     */
    public peutAccepterNouveauxColis(): boolean {
        return this.etat_global === EtatGlobal.OUVERT && this.colis.length < 10;
    }

    /**
     * Vérifie si la cargaison est valide
     */
    public isValid(): boolean {
        return this.trajet.isValid() && this.colis.length >= 1 && this.colis.length <= 10 && this.distance > 0;
    }

    /**
     * Convertit la cargaison en objet plain
     */
    public toObject(): Record<string, any> {
        return {
            id: this.id,
            poids_total: this.poids_total,
            colis: this.colis.map(c => c.getId()),  // On envoie seulement les IDs
            trajet: this.trajet.toObject(),
            etat_global: this.etat_global,
            etat_avance: this.etat_avance,
            distance: this.distance,
            prix_total: this.prix_total
        };
    }

    /**
     * Crée une cargaison à partir d'un objet
     */
    public static fromObject(data: Record<string, any>): Cargaison {
        return new Cargaison(
            data.id || '',
            data.poids_total || 0,
            [], // Les colis seront chargés séparément si nécessaire
            Trajet.fromObject(data.trajet),
            data.etat_global || EtatGlobal.OUVERT,
            data.etat_avance || EtatAvance.PENDING,
            data.distance || 0,
            data.prix_total || 0
        );
    }

    /**
     * Crée une cargaison à partir des données d'un formulaire
     */
    public static fromFormData(formData: FormData): Cargaison {
        const trajet = new Trajet(
            {
                ville: formData.get('lieuDepart') as string,
                lat: 0,
                lng: 0
            },
            {
                ville: formData.get('lieuArrivee') as string,
                lat: 0,
                lng: 0
            }
        );

        return new Cargaison(
            `CARG-${Date.now()}`,
            parseFloat(formData.get('poidsMax') as string) || 0,
            [],
            trajet,
            EtatGlobal.OUVERT,
            EtatAvance.PENDING,
            0,
            0
        );
    }

    public toString(): string {
        return `Cargaison (${this.colis.length} colis, ${this.poids_total}kg)`;
    }
}
