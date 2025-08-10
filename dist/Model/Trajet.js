/**
 * Classe représentant un trajet avec point de départ et d'arrivée
 */
export class Trajet {
    depart;
    arrivee;
    /**
     * Constructeur de la classe Trajet
     */
    constructor(depart = { lat: 0, lng: 0, ville: '' }, arrivee = { lat: 0, lng: 0, ville: '' }) {
        this.depart = depart;
        this.arrivee = arrivee;
    }
    /**
     * Obtient le point de départ
     */
    getDepart() {
        return this.depart;
    }
    /**
     * Définit le point de départ
     */
    setDepart(depart) {
        this.depart = depart;
    }
    /**
     * Obtient le point d'arrivée
     */
    getArrivee() {
        return this.arrivee;
    }
    /**
     * Définit le point d'arrivée
     */
    setArrivee(arrivee) {
        this.arrivee = arrivee;
    }
    /**
     * Obtient la représentation textuelle du trajet
     */
    toString() {
        return `${this.depart.ville} → ${this.arrivee.ville}`;
    }
    /**
     * Vérifie si le trajet est valide (les deux lieux sont définis)
     */
    isValid() {
        return this.depart.ville !== '' && this.arrivee.ville !== '';
    }
    /**
     * Vérifie si le trajet est complet (valide et départ différent de l'arrivée)
     */
    isComplete() {
        return this.isValid() && this.depart.ville !== this.arrivee.ville;
    }
    /**
     * Calcule la distance approximative en kilomètres entre les points
     */
    getDistance() {
        if (!this.isValid())
            return 0;
        const R = 6371; // Rayon de la Terre en km
        const dLat = this.deg2rad(this.arrivee.lat - this.depart.lat);
        const dLon = this.deg2rad(this.arrivee.lng - this.depart.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(this.depart.lat)) * Math.cos(this.deg2rad(this.arrivee.lat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c); // Distance en km arrondie
    }
    /**
     * Convertit les degrés en radians
     */
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    /**
     * Convertit le trajet en objet plain
     */
    toObject() {
        return {
            depart: this.depart,
            arrivee: this.arrivee,
            distance: this.getDistance(),
            trajet_complet: this.toString()
        };
    }
    /**
     * Crée un trajet à partir d'un objet
     */
    static fromObject(data) {
        return new Trajet(data.depart || { lat: 0, lng: 0, ville: '' }, data.arrivee || { lat: 0, lng: 0, ville: '' });
    }
}
