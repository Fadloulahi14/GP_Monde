import { CargaisonService } from "./CargaisonService.js";
export declare class CargaisonUIService {
    private cargaisonService;
    private tbody;
    private searchInput;
    private cargaisons;
    private map;
    private marker1;
    private marker2;
    private routeLine;
    private currentPage;
    private totalPages;
    constructor(cargaisonService: CargaisonService, tbodySelector: string, searchInputSelector: string);
    private getEtatClass;
    private createRow;
    private render;
    private initializeMap;
    calculateRoute(depart: string, arrivee: string): Promise<{
        distance: number;
        duree: string;
    }>;
    private geocode;
    private calculateDistance;
    private deg2rad;
    init(): Promise<void>;
    private createPagination;
    private showCargaisonDetails;
    private closeDetailsModal;
    changePage(newPage: number): Promise<void>;
    private attachModalEvents;
}
