import { CampDay } from "../entity";

export interface CampDayRepositoryPort {
    findAll(queryParams: Partial<CampDay>): Promise<CampDay[]>;

    findById(id: string): Promise<CampDay|undefined>;
    
    findByCampId(campId: string): Promise<CampDay[]>;

    createCampDay(campDay: Omit<CampDay, 'id'>): Promise<CampDay>;

    updateCampDay(id: string, campDayData: Partial<CampDay>): Promise<CampDay|undefined>;

    deleteCampDay(id: string): Promise<boolean>;
}