import { Registration } from "../entity";
import { RegistrationRepositoryPort } from "../ports";

export class RegistrationService {
    constructor(private readonly registrationRepository: RegistrationRepositoryPort) {}

    async getRegistrations(): Promise<Registration[]> {
        return await this.registrationRepository.findAll();
    }

    async getRegistration(id: string): Promise<Registration | undefined> {
        return await this.registrationRepository.findById(id);
    }

    async getRegistrationsByUserId(userId: string): Promise<Registration[]> {
        return await this.registrationRepository.findByUserId(userId);
    }

    async getRegistrationsByCampId(campId: string): Promise<Registration[]> {
        return await this.registrationRepository.findByCampId(campId);
    }

    async getRegistrationByCampAndUser(campId: string, userId: string): Promise<Registration | undefined> {
        return await this.registrationRepository.findByCampAndUser(campId, userId);
    }

    async createRegistration(userId: string, campId: string, dayAvailability: { [dayId: string]: boolean }): Promise<Registration | undefined> {
        return await this.registrationRepository.createRegistration(userId, campId, dayAvailability);
    }

    async updateRegistration(id: string, registrationData: Partial<Registration>): Promise<Registration | undefined> {
        return await this.registrationRepository.updateRegistration(id, registrationData);
    }
}