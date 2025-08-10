import { EtatColis } from './enums/EtatColis';
import { Produit } from './Produit';
import { Client } from './Client';
import { TypeProduit } from './enums/TypeProduit';
import { Cargaison } from './Cargaison';

/**
 * Classe représentant un colis
 */
export class Colis {
    constructor(
        private readonly id: string = Colis.generateId(),
        private poids: number = 0,
        private produit: Produit,
        private client: Client,
        private etat: EtatColis = EtatColis.EN_ATTENTE,
        private cargaison?: Cargaison
    ) {}

    public getId(): string {
        return this.id;
    }

    public getPoidsTotal(): number {
        return this.poids;
    }

    public setPoidsTotal(poids: number): void {
        if (poids < 0) {
            throw new Error("Le poids ne peut pas être négatif");
        }
        this.poids = poids;
    }

    public getEtat(): EtatColis {
        return this.etat;
    }

    public setEtat(etat: EtatColis): void {
        this.etat = etat;
    }

    public getCargaison(): Cargaison | undefined {
        return this.cargaison;
    }

    public setCargaison(cargaison: Cargaison | undefined): void {
        this.cargaison = cargaison;
    }

    public getProduit(): Produit {
        return this.produit;
    }

    public setProduit(produit: Produit): void {
        this.produit = produit;
    }

    public getClient(): Client {
        return this.client;
    }

    public setClient(client: Client): void {
        this.client = client;
    }

    public needsSpecialHandling(): boolean {
        const type = this.produit.getType();
        return type === TypeProduit.FRAGILE || type === TypeProduit.CHIMIQUE;
    }

    public isValid(): boolean {
        return this.poids > 0 && 
               this.produit != null && 
               this.client != null && 
               this.client.isValid();
    }

    private static generateId(prefix: string = 'COL'): string {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp.slice(-6)}-${random}`;
    }

    public toObject(): Record<string, any> {
        return {
            id: this.id,
            poids: this.poids,
            etat: this.etat,
            produit: this.produit.toObject(),
            client: this.client.toObject(),
            cargaison: this.cargaison?.toObject(),
            needsSpecialHandling: this.needsSpecialHandling(),
            isValid: this.isValid()
        };
    }

    public static fromObject(obj: Record<string, any>): Colis {
        if (!obj.produit) {
            throw new Error("Le produit est requis pour créer un colis");
        }
        
        return new Colis(
            obj.id || Colis.generateId(),
            obj.poids || 0,
            Produit.fromObject(obj.produit),
            Client.fromObject(obj.client),
            obj.etat || EtatColis.EN_ATTENTE,
            obj.cargaison ? Cargaison.fromObject(obj.cargaison) : undefined
        );
    }

    public toString(): string {
        return `Colis ${this.id} (${this.poids}kg, ${this.etat})`;
    }
}
