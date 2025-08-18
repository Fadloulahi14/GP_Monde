/**
 * Classe représentant un colis
 */
// export class Colis {
//     constructor(
//         private readonly id: string = Colis.generateId(),
//         private readonly code_suivi: string = Colis.generateCodeSuivi(),
//         private poids: number = 0,
//         private produit: Produit,
//         private client: Client,
//         private expediteur: string = '',
//         private destinataire: string = '',
//         private etat: EtatColis = EtatColis.EN_ATTENTE,
//         private cargaison?: Cargaison
//     ) {}
//     public getId(): string {
//         return this.id;
//     }
//     public getCodeSuivi(): string {
//         return this.code_suivi;
//     }
//     public getExpediteur(): string {
//         return this.expediteur;
//     }
//     public setExpediteur(expediteur: string): void {
//         this.expediteur = expediteur;
//     }
//     public getDestinataire(): string {
//         return this.destinataire;
//     }
//     public setDestinataire(destinataire: string): void {
//         this.destinataire = destinataire;
//     }
//     public getPoidsTotal(): number {
//         return this.poids;
//     }
//     public setPoidsTotal(poids: number): void {
//         if (poids < 0) {
//             throw new Error("Le poids ne peut pas être négatif");
//         }
//         this.poids = poids;
//     }
//     public getEtat(): EtatColis {
//         return this.etat;
//     }
//     public setEtat(etat: EtatColis): void {
//         this.etat = etat;
//     }
//     public getCargaison(): Cargaison | undefined {
//         return this.cargaison;
//     }
//     public setCargaison(cargaison: Cargaison | undefined): void {
//         this.cargaison = cargaison;
//     }
//     public getProduit(): Produit {
//         return this.produit;
//     }
//     public setProduit(produit: Produit): void {
//         this.produit = produit;
//     }
//     public getClient(): Client {
//         return this.client;
//     }
//     public setClient(client: Client): void {
//         this.client = client;
//     }
//     public needsSpecialHandling(): boolean {
//         const type = this.produit.getType();
//         return type === TypeProduit.FRAGILE || type === TypeProduit.CHIMIQUE;
//     }
//     public isValid(): boolean {
//         return this.poids > 0 && 
//                this.produit != null && 
//                this.client != null && 
//                this.client.isValid();
//     }
//     private static generateId(prefix: string = 'COL'): string {
//         const timestamp = Date.now().toString();
//         const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//         return `${prefix}-${timestamp.slice(-6)}-${random}`;
//     }
//     private static generateCodeSuivi(): string {
//         const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//         const numbers = '0123456789';
//         let code = '';
//         // Génère un code de 8 caractères: 2 lettres + 6 chiffres
//         for (let i = 0; i < 2; i++) {
//             code += letters.charAt(Math.floor(Math.random() * letters.length));
//         }
//         for (let i = 0; i < 6; i++) {
//             code += numbers.charAt(Math.floor(Math.random() * numbers.length));
//         }
//         return code;
//     }
//     public toObject(): Record<string, any> {
//         return {
//             id: this.id,
//             code_suivi: this.code_suivi,
//             poids: this.poids,
//             etat: this.etat,
//             expediteur: this.expediteur,
//             destinataire: this.destinataire,
//             produit: this.produit.toObject(),
//             client: this.client.toObject(),
//             cargaison: this.cargaison?.toObject(),
//             needsSpecialHandling: this.needsSpecialHandling(),
//             isValid: this.isValid()
//         };
//     }
//     public static fromObject(obj: Record<string, any>): Colis {
//         if (!obj.produit) {
//             throw new Error("Le produit est requis pour créer un colis");
//         }
//         if (!obj.client) {
//             throw new Error("Le client est requis pour créer un colis");
//         }
//         return new Colis(
//             obj.id || Colis.generateId(),
//             obj.code_suivi || Colis.generateCodeSuivi(),
//             obj.poids || 0,
//             Produit.fromObject(obj.produit),
//             Client.fromObject(obj.client),
//             obj.expediteur || '',
//             obj.destinataire || '',
//             obj.etat || EtatColis.EN_ATTENTE,
//             obj.cargaison ? Cargaison.fromObject(obj.cargaison) : undefined
//         );
//     }
//     public toString(): string {
//         return `Colis ${this.id} (${this.poids}kg, ${this.etat})`;
//     }
// }
export class Colis {
    constructor(id, code_suivi, typeProduit, poids, expediteur, destinataire, etat, cargaisonId) {
        this.id = id;
        this.code_suivi = code_suivi;
        this.typeProduit = typeProduit;
        this.poids = poids;
        this.expediteur = expediteur;
        this.destinataire = destinataire;
        this.etat = etat;
        this.cargaisonId = cargaisonId;
    }
    getId() { return this.id; }
    getCodeSuivi() { return this.code_suivi; }
    getTypeProduit() { return this.typeProduit; }
    getPoidsTotal() { return this.poids; }
    getExpediteur() { return this.expediteur; }
    getDestinataire() { return this.destinataire; }
    getEtat() { return this.etat; }
    getCargaison() { return this.cargaisonId; }
    setEtat(etat) { this.etat = etat; }
    setCargaison(cargaisonId) { this.cargaisonId = cargaisonId; }
    toString() {
        return `Colis ${this.code_suivi} - ${this.typeProduit}, ${this.poids}kg, Etat: ${this.etat}`;
    }
}
