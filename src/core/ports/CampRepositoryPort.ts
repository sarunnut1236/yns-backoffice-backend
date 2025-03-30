import { Camp } from "../entity";

export interface CampRepositoryPort {
    findAll(): Promise<Camp[]>;

    findById(id: string): Promise<Camp|undefined>;

    createCamp(campData: Omit<Camp, 'id'>): Promise<Camp>;

    updateCamp(id: string, campData: Partial<Camp>): Promise<Camp|undefined>;

    deleteCamp(id: string): Promise<boolean>;
}