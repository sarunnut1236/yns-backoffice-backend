import { Camp } from "../entity";

export interface CampRepositoryPort {
    findAll(queryParams?: Partial<Camp>): Promise<Camp[]>;

    findOne(queryParams: Partial<Camp>): Promise<Camp|undefined>;

    createCamp(campData: Omit<Camp, 'id'>): Promise<Camp>;

    updateCamp(id: string, campData: Omit<Partial<Camp>, 'id'>): Promise<Camp|undefined>;

    deleteCamp(id: string): Promise<boolean>;
}