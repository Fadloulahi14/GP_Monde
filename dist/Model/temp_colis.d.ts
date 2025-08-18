import { EtatColis } from './enums/EtatColis';
import { Produit } from './Produit';
import { Client } from './Client';
import { Cargaison } from './Cargaison';
/**
 * Classe représentant un colis
 */
export declare class Colis {
    private readonly id;
    private poids;
    private produit;
    private client;
    private etat;
    private cargaison?;
    constructor(id: string | undefined, poids: number | undefined, produit: Produit, client: Client, etat?: EtatColis, cargaison?: Cargaison | undefined);
    getId(): string;
    getPoidsTotal(): number;
    setPoidsTotal(poids: number): void;
    getEtat(): EtatColis;
    setEtat(etat: EtatColis): void;
    getCargaison(): Cargaison | undefined;
    setCargaison(cargaison: Cargaison | undefined): void;
    getProduit(): Produit;
    setProduit(produit: Produit): void;
    getClient(): Client;
    setClient(client: Client): void;
    needsSpecialHandling(): boolean;
    isValid(): boolean;
    private static generateId;
    toObject(): Record<string, any>;
    static fromObject(obj: Record<string, any>): Colis;
    toString(): string;
}
