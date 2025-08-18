/**
 * Interface représentant une position géographique
 */
interface Position {
    lat: number;
    lng: number;
    ville: string;
}
/**
 * Classe représentant un trajet avec point de départ et d'arrivée
 */
export declare class Trajet {
    private depart;
    private arrivee;
    /**
     * Constructeur de la classe Trajet
     */
    constructor(depart?: Position, arrivee?: Position);
    /**
     * Obtient le point de départ
     */
    getDepart(): Position;
    /**
     * Définit le point de départ
     */
    setDepart(depart: Position): void;
    /**
     * Obtient le point d'arrivée
     */
    getArrivee(): Position;
    /**
     * Définit le point d'arrivée
     */
    setArrivee(arrivee: Position): void;
    /**
     * Obtient la représentation textuelle du trajet
     */
    toString(): string;
    /**
     * Vérifie si le trajet est valide (les deux lieux sont définis)
     */
    isValid(): boolean;
    /**
     * Vérifie si le trajet est complet (valide et départ différent de l'arrivée)
     */
    isComplete(): boolean;
    /**
     * Calcule la distance approximative en kilomètres entre les points
     */
    getDistance(): number;
    /**
     * Convertit les degrés en radians
     */
    private deg2rad;
    /**
     * Convertit le trajet en objet plain
     */
    toObject(): Record<string, any>;
    /**
     * Crée un trajet à partir d'un objet
     */
    static fromObject(data: Record<string, any>): Trajet;
}
export {};
