import { ColisService } from "./ColisService.js";
declare global {
    interface Window {
        closeColisModal: () => void;
        voirColis: (id: string) => void;
    }
}
export declare class ColisUIService {
    private colisService;
    private tbody;
    private searchInput;
    constructor(colisService: ColisService, tbodySelector: string, searchInputSelector: string);
    init(): Promise<void>;
    private renderColis;
    private setupForm;
    private setupSearch;
    private getEtatClass;
}
