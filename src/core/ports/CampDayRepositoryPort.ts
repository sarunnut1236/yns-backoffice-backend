import { CampDay } from "../entity";

export interface CampDayRepositoryPort {
    findAll(queryParams: Partial<CampDay>): Promise<CampDay[]>;

    findOne(queryParams: Partial<CampDay>): Promise<CampDay|undefined>;

    findByCampId(campId: string): Promise<CampDay[]>;

    createCampDay(campDay: Omit<CampDay, 'id'>): Promise<CampDay>;

    updateCampDay(id: string, campDayData: Omit<Partial<CampDay>, 'id'>): Promise<CampDay|undefined>;

    deleteCampDay(id: string): Promise<boolean>;
}