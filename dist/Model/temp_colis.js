import { EtatColis } from './enums/EtatColis';
import { Produit } from './Produit';
import { Client } from './Client';
import { TypeProduit } from './enums/TypeProduit';
import { Cargaison } from './Cargaison';
/**
 * Classe représentant un colis
 */
export class Colis {
    id;
    poids;
    produit;
    client;
    etat;
    cargaison;
    constructor(id = Colis.generateId(), poids = 0, produit, client, etat = EtatColis.EN_ATTENTE, cargaison) {
        this.id = id;
        this.poids = poids;
        this.produit = produit;
        this.client = client;
        this.etat = etat;
        this.cargaison = cargaison;
    }
    getId() {
        return this.id;
    }
    getPoidsTotal() {
        return this.poids;
    }
    setPoidsTotal(poids) {
        if (poids < 0) {
            throw new Error("Le poids ne peut pas être négatif");
        }
        this.poids = poids;
    }
    getEtat() {
        return this.etat;
    }
    setEtat(etat) {
        this.etat = etat;
    }
    getCargaison() {
        return this.cargaison;
    }
    setCargaison(cargaison) {
        this.cargaison = cargaison;
    }
    getProduit() {
        return this.produit;
    }
    setProduit(produit) {
        this.produit = produit;
    }
    getClient() {
        return this.client;
    }
    setClient(client) {
        this.client = client;
    }
    needsSpecialHandling() {
        const type = this.produit.getType();
        return type === TypeProduit.FRAGILE || type === TypeProduit.CHIMIQUE;
    }
    isValid() {
        return this.poids > 0 &&
            this.produit != null &&
            this.client != null &&
            this.client.isValid();
    }
    static generateId(prefix = 'COL') {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp.slice(-6)}-${random}`;
    }
    toObject() {
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
    static fromObject(obj) {
        if (!obj.produit) {
            throw new Error("Le produit est requis pour créer un colis");
        }
        return new Colis(obj.id || Colis.generateId(), obj.poids || 0, Produit.fromObject(obj.produit), Client.fromObject(obj.client), obj.etat || EtatColis.EN_ATTENTE, obj.cargaison ? Cargaison.fromObject(obj.cargaison) : undefined);
    }
    toString() {
        return `Colis ${this.id} (${this.poids}kg, ${this.etat})`;
    }
}
