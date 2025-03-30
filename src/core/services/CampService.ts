import { Camp } from "../entity";
import { CampRepositoryPort } from "../ports";

export class CampService {
    constructor(private readonly campRepository: CampRepositoryPort) {}

    async getCamps(queryParams: Partial<Camp>): Promise<Camp[]> {
        try {
            return await this.campRepository.findAll(queryParams);
        } catch (error) {
            console.error(`CampService.getCamps: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async getCamp(id: string): Promise<Camp | undefined> {
        try {
            return await this.campRepository.findOne({ id });
        } catch (error) {
            console.error(`CampService.getCamp: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async createCamp(campData: Omit<Camp, "id">): Promise<Camp> {
        try {
            return await this.campRepository.createCamp(campData);
        } catch (error) {
            console.error(`CampService.createCamp: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async updateCamp(
        id: string,
        campData: Omit<Partial<Camp>, "id">
    ): Promise<Camp | undefined> {
        try {
            return await this.campRepository.updateCamp(id, campData);
        } catch (error) {
            console.error(`CampService.updateCamp: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async deleteCamp(id: string): Promise<boolean> {
        try {
            return await this.campRepository.deleteCamp(id);
        } catch (error) {
            console.error(`CampService.deleteCamp: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
}
