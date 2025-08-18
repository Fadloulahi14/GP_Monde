import { EtatGlobal } from './enums/EtatGlobal.js';
import { EtatAvance } from './enums/EtatAvance.js';
import { Trajet } from './Trajet.js';
import { Colis } from './Colis.js';
/**
 * Classe représentant une cargaison
 */
export declare class Cargaison {
    private readonly id;
    private poids_total;
    private colis;
    private trajet;
    private etat_global;
    private etat_avance;
    private distance;
    private prix_total;
    /**
     * Constructeur de la classe Cargaison
     */
    constructor(id?: string, // Ajout de l'ID
    poids_total?: number, colis?: Colis[], trajet?: Trajet, etat_global?: EtatGlobal, etat_avance?: string | EtatAvance, distance?: number, prix_total?: number);
    /**
     * Obtient le poids total de la cargaison
     */
    getPoidsTotal(): number;
    /**
     * Définit le poids total de la cargaison
     */
    setPoidsTotal(poids_total: number): void;
    /**
     * Obtient la liste des colis
     */
    getColis(): Colis[];
    /**
     * Définit la liste des colis
     */
    setColis(colis: Colis[]): void;
    /**
     * Obtient le trajet de la cargaison
     */
    getTrajet(): Trajet;
    /**
     * Définit le trajet de la cargaison
     */
    setTrajet(trajet: Trajet): void;
    /**
     * Obtient l'état global de la cargaison
     */
    getEtatGlobal(): EtatGlobal;
    /**
     * Définit l'état global de la cargaison
     */
    setEtatGlobal(etat_global: EtatGlobal): void;
    /**
     * Obtient l'état d'avancement de la cargaison
     */
    getEtatAvance(): string | EtatAvance;
    /**
     * Définit l'état d'avancement de la cargaison
     */
    setEtatAvance(etat_avance: string | EtatAvance): void;
    /**
     * Obtient la distance de la cargaison
     */
    getDistance(): number;
    /**
     * Définit la distance de la cargaison
     */
    setDistance(distance: number): void;
    /**
     * Obtient le prix total de la cargaison
     */
    getPrixTotal(): number;
    /**
     * Définit le prix total de la cargaison
     */
    setPrixTotal(prix_total: number): void;
    /**
     * Ajoute un colis à la cargaison
     */
    ajouterColis(colis: Colis): void;
    /**
     * Retire un colis de la cargaison
     */
    retirerColis(index: number): boolean;
    /**
     * Recalcule le poids total basé sur les colis
     */
    private recalculerPoidsTotal;
    /**
     * Recalcule le prix total basé sur les colis (minimum 10.000 FCFA par colis)
     */
    private recalculerPrixTotal;
    /**
     * Obtient le nombre total de colis
     */
    getNombreTotalColis(): number;
    /**
     * Vérifie si la cargaison peut accepter de nouveaux colis
     */
    peutAccepterColis(): boolean;
    /**
     * Ferme la cargaison (ne peut plus accepter de colis)
     */
    fermer(): void;
    /**
     * Démarre le transport de la cargaison
     */
    demarrerTransport(): void;
    /**
     * Termine la cargaison
     */
    terminer(): void;
    /**
     * Vérifie si la cargaison peut accepter encore des colis
     */
    peutAccepterNouveauxColis(): boolean;
    /**
     * Vérifie si la cargaison est valide
     */
    isValid(): boolean;
    /**
     * Convertit la cargaison en objet plain
     */
    toObject(): Record<string, any>;
    /**
     * Crée une cargaison à partir d'un objet
     */
    static fromObject(data: Record<string, any>): Cargaison;
    /**
     * Crée une cargaison à partir des données d'un formulaire
     */
    static fromFormData(formData: FormData): Cargaison;
    toString(): string;
}
