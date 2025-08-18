export declare enum EtatAvance {
    PENDING = "pending",
    ARRIVED = "arrived"
}
export declare class EtatAvanceUtils {
    static getAllStates(): EtatAvance[];
    static getLabel(etat: EtatAvance): string;
    static getDescription(etat: EtatAvance): string;
    static getColor(etat: EtatAvance): string;
    static isValid(value: string): value is EtatAvance;
    static isCompleted(etat: EtatAvance): boolean;
}
