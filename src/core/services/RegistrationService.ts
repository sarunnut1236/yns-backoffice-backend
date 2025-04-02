import { Registration } from "../entity";
import { RegistrationRepositoryPort } from "../ports";

export class RegistrationService {
    constructor(
        private readonly registrationRepository: RegistrationRepositoryPort
    ) {}

    async getRegistrations(
        queryParams: Partial<Registration>
    ): Promise<Registration[]> {
        return await this.registrationRepository.findAll(queryParams);
    }

    async getRegistration(id: string): Promise<Registration | undefined> {
        return await this.registrationRepository.findOne({ id });
    }

    async createRegistration(
        registrationData: Omit<Registration, 'id'>
    ): Promise<Registration | undefined> {
        return await this.registrationRepository.createRegistration(
            registrationData
        );
    }

    async updateRegistration(
        id: string,
        registrationData: Partial<Registration>
    ): Promise<Registration | undefined> {
        return await this.registrationRepository.updateRegistration(
            id,
            registrationData
        );
    }
    
    async deleteRegistration(id: string): Promise<boolean> {
        return await this.registrationRepository.deleteRegistration(id);
    }
}
