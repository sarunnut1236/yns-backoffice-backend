import { Registration } from "../entity";

export interface RegistrationRepositoryPort {
    findAll(queryParams: Partial<Registration>): Promise<Registration[]>;

    findOne(queryParams: Partial<Registration>): Promise<Registration|undefined>;

    createRegistration(registrationData: Omit<Registration, 'id'>): Promise<Registration|undefined>;

    updateRegistration(id: string, registrationData: Omit<Partial<Registration>, 'id'>): Promise<Registration|undefined>;
    
    deleteRegistration(id: string): Promise<boolean>;
}