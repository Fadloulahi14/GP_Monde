import { EtatGlobal } from './enums/EtatGlobal';
import { EtatAvance } from './enums/EtatAvance';
import { Trajet } from './Trajet';
/**
 * Classe représentant une cargaison
 */
export class Cargaison {
    id;
    poids_total;
    colis;
    trajet;
    etat_global;
    etat_avance;
    distance;
    prix_total;
    /**
     * Constructeur de la classe Cargaison
     */
    constructor(id = '', // Ajout de l'ID
    poids_total = 0, colis = [], trajet = new Trajet(), etat_global = EtatGlobal.OUVERT, etat_avance = EtatAvance.PENDING, distance = 0, prix_total = 0) {
        this.id = id;
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
    getPoidsTotal() {
        return this.poids_total;
    }
    /**
     * Définit le poids total de la cargaison
     */
    setPoidsTotal(poids_total) {
        if (poids_total < 0) {
            throw new Error("Le poids total ne peut pas être négatif");
        }
        this.poids_total = poids_total;
    }
    /**
     * Obtient la liste des colis
     */
    getColis() {
        return this.colis;
    }
    /**
     * Définit la liste des colis
     */
    setColis(colis) {
        this.colis = colis;
        this.recalculerPoidsTotal();
    }
    /**
     * Obtient le trajet de la cargaison
     */
    getTrajet() {
        return this.trajet;
    }
    /**
     * Définit le trajet de la cargaison
     */
    setTrajet(trajet) {
        this.trajet = trajet;
    }
    /**
     * Obtient l'état global de la cargaison
     */
    getEtatGlobal() {
        return this.etat_global;
    }
    /**
     * Définit l'état global de la cargaison
     */
    setEtatGlobal(etat_global) {
        this.etat_global = etat_global;
    }
    /**
     * Obtient l'état d'avancement de la cargaison
     */
    getEtatAvance() {
        return this.etat_avance;
    }
    /**
     * Définit l'état d'avancement de la cargaison
     */
    setEtatAvance(etat_avance) {
        this.etat_avance = etat_avance;
    }
    /**
     * Obtient la distance de la cargaison
     */
    getDistance() {
        return this.distance;
    }
    /**
     * Définit la distance de la cargaison
     */
    setDistance(distance) {
        if (distance < 0) {
            throw new Error("La distance ne peut pas être négative");
        }
        this.distance = distance;
    }
    /**
     * Obtient le prix total de la cargaison
     */
    getPrixTotal() {
        return this.prix_total;
    }
    /**
     * Définit le prix total de la cargaison
     */
    setPrixTotal(prix_total) {
        if (prix_total < 0) {
            throw new Error("Le prix total ne peut pas être négatif");
        }
        this.prix_total = prix_total;
    }
    /**
     * Ajoute un colis à la cargaison
     */
    ajouterColis(colis) {
        if (this.etat_global !== EtatGlobal.OUVERT) {
            throw new Error("Impossible d'ajouter un colis à une cargaison fermée");
        }
        this.colis.push(colis);
        this.recalculerPoidsTotal();
    }
    /**
     * Retire un colis de la cargaison
     */
    retirerColis(index) {
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
    recalculerPoidsTotal() {
        this.poids_total = this.colis.reduce((total, colis) => total + colis.getPoidsTotal(), 0);
    }
    /**
     * Obtient le nombre total de colis
     */
    getNombreTotalColis() {
        return this.colis.length;
    }
    /**
     * Vérifie si la cargaison peut accepter de nouveaux colis
     */
    peutAccepterColis() {
        return this.etat_global === EtatGlobal.OUVERT;
    }
    /**
     * Ferme la cargaison (ne peut plus accepter de colis)
     */
    fermer() {
        this.etat_global = EtatGlobal.FERME;
    }
    /**
     * Démarre le transport de la cargaison
     */
    demarrerTransport() {
        if (this.etat_global === EtatGlobal.FERME) {
            this.etat_global = EtatGlobal.EN_COURS;
        }
        else {
            throw new Error("La cargaison doit être fermée avant de démarrer le transport");
        }
    }
    /**
     * Termine la cargaison
     */
    terminer() {
        this.etat_global = EtatGlobal.TERMINE;
        this.etat_avance = EtatAvance.ARRIVED;
    }
    /**
     * Vérifie si la cargaison est valide
     */
    isValid() {
        return this.trajet.isValid() && this.colis.length > 0 && this.distance > 0;
    }
    /**
     * Convertit la cargaison en objet plain
     */
    toObject() {
        return {
            id: this.id,
            poids_total: this.poids_total,
            colis: this.colis.map(c => c.getId()), // On envoie seulement les IDs
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
    static fromObject(data) {
        return new Cargaison(data.id || '', data.poids_total || 0, [], // Les colis seront chargés séparément si nécessaire
        Trajet.fromObject(data.trajet), data.etat_global || EtatGlobal.OUVERT, data.etat_avance || EtatAvance.PENDING, data.distance || 0, data.prix_total || 0);
    }
    toString() {
        return `Cargaison (${this.colis.length} colis, ${this.poids_total}kg)`;
    }
}
