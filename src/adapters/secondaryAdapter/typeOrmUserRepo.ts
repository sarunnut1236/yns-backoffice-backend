import { User, UserRole } from "../../core/entity";
import { UserRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';
import { In } from "typeorm";

export class TypeOrmUserRepository implements UserRepositoryPort {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        return user || undefined;
    }

    async findByLiffUserId(liffUserId: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { liffUserId }
        });
        return user || undefined;
    }

    async bulkFindByIds(ids: string[]): Promise<User[]> {
        return await this.userRepository.findBy({ id: In(ids) });
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const newUser = this.userRepository.create({
            ...user,
            id: uuidv4(),
            role: UserRole.GUEST,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await this.userRepository.save(newUser);
    }

    async createDefaultUser(liffUserId: string): Promise<User> {
        const newUser = this.userRepository.create({
            id: uuidv4(),
            liffUserId,
            role: UserRole.GUEST,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
        const userToUpdate = await this.userRepository.findOne({
            where: { id }
        });

        if (!userToUpdate) {
            return undefined;
        }

        const updatedUser = {
            ...userToUpdate,
            ...userData,
            updatedAt: new Date()
        };

        return await this.userRepository.save(updatedUser);
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
