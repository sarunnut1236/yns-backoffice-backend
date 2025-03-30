import { Registration } from "../entity";

export interface RegistrationRepositoryPort {
    findAll(): Promise<Registration[]>;

    findById(id: string): Promise<Registration|undefined>;

    findByUserId(userId: string): Promise<Registration[]>;

    findByCampId(campId: string): Promise<Registration[]>;

    findByCampAndUser(campId: string, userId: string): Promise<Registration|undefined>;

    createRegistration(userId: string, campId: string, dayAvailability: { [dayId: string]: boolean }): Promise<Registration|undefined>;

    updateRegistration(id: string, registrationData: Partial<Registration>): Promise<Registration|undefined>;
}