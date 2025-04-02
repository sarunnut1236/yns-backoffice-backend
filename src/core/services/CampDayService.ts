import { CampDay } from "../entity";
import { CampDayRepositoryPort } from "../ports";

export class CampDayService {
    constructor(private readonly campDayRepository: CampDayRepositoryPort) {}

    async getCampDays(queryParams: Partial<CampDay>): Promise<CampDay[]> {
        return await this.campDayRepository.findAll(queryParams);
    }

    async getCampDay(id: string): Promise<CampDay | undefined> {
        return await this.campDayRepository.findOne({ id });
    }

    async getCampDaysByCampId(campId: string): Promise<CampDay[]> {
        return await this.campDayRepository.findByCampId(campId);
    }

    async createCampDay(campDay: Omit<CampDay, "id">): Promise<CampDay> {
        return await this.campDayRepository.createCampDay(campDay);
    }

    async updateCampDay(
        id: string,
        campDayData: Partial<CampDay>
    ): Promise<CampDay | undefined> {
        return await this.campDayRepository.updateCampDay(id, campDayData);
    }

    async deleteCampDay(id: string): Promise<boolean> {
        return await this.campDayRepository.deleteCampDay(id);
    }
}