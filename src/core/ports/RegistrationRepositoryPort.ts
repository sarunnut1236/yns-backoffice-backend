import { Registration } from "../entity";

export interface RegistrationRepositoryPort {
    findAll(queryParams: Partial<Registration>): Promise<Registration[]>;

    findById(id: string): Promise<Registration|undefined>;

    createRegistration(userId: string, campId: string, dayAvailability: { [dayId: string]: boolean }, registrationDate: Date): Promise<Registration|undefined>;

    updateRegistration(id: string, registrationData: Partial<Registration>): Promise<Registration|undefined>;
}