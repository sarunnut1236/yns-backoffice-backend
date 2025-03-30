import { Registration } from "../../core/entity";
import { RegistrationRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';

export class TypeOrmRegistrationRepository implements RegistrationRepositoryPort {
    private registrationRepository = AppDataSource.getRepository(Registration);

    async findAll(): Promise<Registration[]> {
        return await this.registrationRepository.find({
            relations: ["user", "camp"]
        });
    }

    async findById(id: string): Promise<Registration | undefined> {
        const registration = await this.registrationRepository.findOne({
            where: { id },
            relations: ["user", "camp"]
        });
        return registration || undefined;
    }

    async findByUserId(userId: string): Promise<Registration[]> {
        return await this.registrationRepository.find({
            where: { user: { id: userId } },
            relations: ["user", "camp"]
        });
    }

    async findByCampId(campId: string): Promise<Registration[]> {
        return await this.registrationRepository.find({
            where: { camp: { id: campId } },
            relations: ["user", "camp"]
        });
    }

    async findByCampAndUser(campId: string, userId: string): Promise<Registration | undefined> {
        const registration = await this.registrationRepository.findOne({
            where: { 
                camp: { id: campId },
                user: { id: userId }
            },
            relations: ["user", "camp"]
        });
        return registration || undefined;
    }

    async createRegistration(userId: string, campId: string, dayAvailability: { [dayId: string]: boolean }): Promise<Registration | undefined> {
        try {
            const userRepository = AppDataSource.getRepository('User');
            const campRepository = AppDataSource.getRepository('Camp');
            
            const user = await userRepository.findOne({ where: { id: userId } });
            const camp = await campRepository.findOne({ where: { id: campId } });
            
            if (!user || !camp) {
                return undefined;
            }
            
            const newRegistration = this.registrationRepository.create({
                id: uuidv4(),
                user,
                camp,
                dayAvailability,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            return await this.registrationRepository.save(newRegistration);
        } catch (error) {
            console.error('Error creating registration:', error);
            return undefined;
        }
    }

    async updateRegistration(id: string, registrationData: Partial<Registration>): Promise<Registration | undefined> {
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
}