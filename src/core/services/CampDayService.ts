import { CampDay } from "../entity";
import { CampDayRepositoryPort } from "../ports";

export class CampDayService {
    constructor(private readonly campDayRepository: CampDayRepositoryPort) {}

    async getCampDays(queryParams: Partial<CampDay>): Promise<CampDay[]> {
        try {
            return await this.campDayRepository.findAll(queryParams);
        } catch (error) {
            console.error(`CampDayService.getCampDays: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async getCampDay(id: string): Promise<CampDay | undefined> {
        try {
            return await this.campDayRepository.findOne({ id });
        } catch (error) {
            console.error(`CampDayService.getCampDay: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async getCampDaysByCampId(campId: string): Promise<CampDay[]> {
        try {
            return await this.campDayRepository.findByCampId(campId);
        } catch (error) {
            console.error(`CampDayService.getCampDaysByCampId: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async createCampDay(campDay: Omit<CampDay, "id">): Promise<CampDay> {
        try {
            return await this.campDayRepository.createCampDay(campDay);
        } catch (error) {
            console.error(`CampDayService.createCampDay: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async updateCampDay(
        id: string,
        campDayData: Partial<CampDay>
    ): Promise<CampDay | undefined> {
        try {
            return await this.campDayRepository.updateCampDay(id, campDayData);
        } catch (error) {
            console.error(`CampDayService.updateCampDay: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async deleteCampDay(id: string): Promise<boolean> {
        try {
            return await this.campDayRepository.deleteCampDay(id);
        } catch (error) {
            console.error(`CampDayService.deleteCampDay: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
}