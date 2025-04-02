import { Registration } from "../../core/entity";
import { RegistrationRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';
import { turnToWhereClause } from "./utils";

export class TypeOrmRegistrationRepository implements RegistrationRepositoryPort {
    private registrationRepository = AppDataSource.getRepository(Registration);

    async findAll(queryParams: Partial<Registration>): Promise<Registration[]> {
        return await this.registrationRepository.find({
            where: turnToWhereClause(queryParams),
            relations: ["user", "camp"],
        });
    }

    async findOne(queryParams: Partial<Registration>): Promise<Registration | undefined> {
        const registration = await this.registrationRepository.findOne({
            where: turnToWhereClause(queryParams),
            relations: ["user", "camp"],
        });
        return registration || undefined;
    }

    async createRegistration(registrationData: Omit<Registration, 'id'>): Promise<Registration | undefined> {
        try {
            const userRepository = AppDataSource.getRepository('User');
            const campRepository = AppDataSource.getRepository('Camp');
            
            const user = await userRepository.findOne({ where: { id: registrationData.user } });
            const camp = await campRepository.findOne({ where: { id: registrationData.camp } });
            
            if (!user || !camp) {
                return undefined;
            }
            
            const newRegistration = this.registrationRepository.create({
                ...registrationData,
                id: uuidv4(),
                user,
                camp,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            return await this.registrationRepository.save(newRegistration);
        } catch (error) {
            console.error('Error creating registration:', error);
            return undefined;
        }
    }

    async updateRegistration(id: string, registrationData: Omit<Partial<Registration>, 'id'>): Promise<Registration | undefined> {
        const registrationToUpdate = await this.registrationRepository.findOne({
            where: { id },
            relations: ["user", "camp"]
        });

        if (!registrationToUpdate) {
            return undefined;
        }

        const updatedRegistration = {
            ...registrationToUpdate,
            ...registrationData,
            updatedAt: new Date()
        };

        return await this.registrationRepository.save(updatedRegistration);
    }

    async deleteRegistration(id: string): Promise<boolean> {
        try {
            const registrationToDelete = await this.registrationRepository.findOne({
                where: { id }
            });

            if (!registrationToDelete) {
                return false;
            }

            await this.registrationRepository.remove(registrationToDelete);
            return true;
        } catch (error) {
            console.error('Error deleting registration:', error);
            return false;
        }
    }
}