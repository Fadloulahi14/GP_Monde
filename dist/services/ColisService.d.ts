import { Colis } from "../Model/Colis.js";
export declare class ColisService {
    private apiUrl;
    constructor();
    getAll(): Promise<Colis[]>;
    createColis(formData: FormData): Promise<Colis>;
    private mapToColis;
    private generateCodeSuivi;
}
