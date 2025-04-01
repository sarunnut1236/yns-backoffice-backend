import { Registration } from "../entity";
import { RegistrationRepositoryPort } from "../ports";

export class RegistrationService {
    constructor(private readonly registrationRepository: RegistrationRepositoryPort) {}

    async getRegistrations(queryParams: Partial<Registration>): Promise<Registration[]> {
        return await this.registrationRepository.findAll(queryParams);
    }

    async getRegistration(id: string): Promise<Registration | undefined> {
        return await this.registrationRepository.findById(id);
    }

    async createRegistration(userId: string, campId: string, dayAvailability: { [dayId: string]: boolean }, registrationDate: Date): Promise<Registration | undefined> {
        return await this.registrationRepository.createRegistration(userId, campId, dayAvailability, registrationDate);
    }

    async updateRegistration(id: string, registrationData: Partial<Registration>): Promise<Registration | undefined> {
        return await this.registrationRepository.updateRegistration(id, registrationData);
    }
}