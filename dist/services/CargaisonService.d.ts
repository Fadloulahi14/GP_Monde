import { Cargaison } from "../Model/Cargaison.js";
export declare class CargaisonService {
    private apiUrl;
    constructor();
    getAll(page?: number, limit?: number): Promise<{
        cargaisons: Cargaison[];
        total: number;
    }>;
    filter(cargaisons: Cargaison[], searchTerm: string): Cargaison[];
    create(formData: FormData): Promise<any>;
    getColisDisponibles(): Promise<any[]>;
    fermerCargaison(cargaisonId: string): Promise<void>;
    rouvrirCargaison(cargaisonId: string): Promise<void>;
    getById(id: string): Promise<any>;
    addColisToCargaison(cargaisonId: string, colisId: string): Promise<void>;
    updateStatus(cargaisonId: string, newStatus: string): Promise<void>;
}
