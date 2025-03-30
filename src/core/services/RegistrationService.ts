import { Registration } from "../entity";
import { RegistrationRepositoryPort } from "../ports";

export class RegistrationService {
    constructor(
        private readonly registrationRepository: RegistrationRepositoryPort
    ) {}

    async getRegistrations(
        queryParams: Partial<Registration>
    ): Promise<Registration[]> {
        try {
            return await this.registrationRepository.findAll(queryParams);
        } catch (error) {
            console.error(`RegistrationService.getRegistrations: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async getRegistration(id: string): Promise<Registration | undefined> {
        try {
            return await this.registrationRepository.findOne({ id });
        } catch (error) {
            console.error(`RegistrationService.getRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async createRegistration(
        registrationData: Omit<Registration, 'id'>
    ): Promise<Registration | undefined> {
        try {
            return await this.registrationRepository.createRegistration(
                registrationData
            );
        } catch (error) {
            console.error(`RegistrationService.createRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async updateRegistration(
        id: string,
        registrationData: Partial<Registration>
    ): Promise<Registration | undefined> {
        try {
            return await this.registrationRepository.updateRegistration(
                id,
                registrationData
            );
        } catch (error) {
            console.error(`RegistrationService.updateRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
    
    async deleteRegistration(id: string): Promise<boolean> {
        try {
            return await this.registrationRepository.deleteRegistration(id);
        } catch (error) {
            console.error(`RegistrationService.deleteRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }
}
