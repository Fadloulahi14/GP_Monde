
export enum EtatAvance {
    PENDING = 'pending',
    ARRIVED = 'arrived'
}


export class EtatAvanceUtils {
  
    public static getAllStates(): EtatAvance[] {
        return Object.values(EtatAvance);
    }

  
    public static getLabel(etat: EtatAvance): string {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'En attente';
            case EtatAvance.ARRIVED:
                return 'Arrivé';
            default:
                return 'Inconnu';
        }
    }

  
    public static getDescription(etat: EtatAvance): string {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'Cargaison en cours de transport';
            case EtatAvance.ARRIVED:
                return 'Cargaison arrivée à destination';
            default:
                return 'État d\'avancement inconnu';
        }
    }

 
    public static getColor(etat: EtatAvance): string {
        switch (etat) {
            case EtatAvance.PENDING:
                return 'orange';
            case EtatAvance.ARRIVED:
                return 'green';
            default:
                return 'gray';
        }
    }

   
    public static isValid(value: string): value is EtatAvance {
        return Object.values(EtatAvance).includes(value as EtatAvance);
    }

   
    public static isCompleted(etat: EtatAvance): boolean {
        return etat === EtatAvance.ARRIVED;
    }
}
