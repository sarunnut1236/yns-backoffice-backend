import { Camp } from "../entity";
import { CampRepositoryPort } from "../ports";

export class CampService {
    constructor(private readonly campRepository: CampRepositoryPort) {}

    async getCamps(queryParams: Partial<Camp>): Promise<Camp[]> {
        return await this.campRepository.findAll(queryParams);
    }

    async getCamp(id: string): Promise<Camp | undefined> {
        return await this.campRepository.findOne({ id });
    }

    async createCamp(campData: Omit<Camp, "id">): Promise<Camp> {
        return await this.campRepository.createCamp(campData);
    }

    async updateCamp(
        id: string,
        campData: Omit<Partial<Camp>, "id">
    ): Promise<Camp | undefined> {
        return await this.campRepository.updateCamp(id, campData);
    }

    async deleteCamp(id: string): Promise<boolean> {
        return await this.campRepository.deleteCamp(id);
    }
}
