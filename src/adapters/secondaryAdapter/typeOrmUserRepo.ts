import { User, UserRole } from "../../core/entity";
import { UserRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';
import { In } from "typeorm";
import { turnToWhereClause } from "./utils";

export class TypeOrmUserRepository implements UserRepositoryPort {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(queryParams: Partial<User>): Promise<User[]> {
        return await this.userRepository.find(turnToWhereClause(queryParams));
    }

    async findOne(queryParams: Partial<User>): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: turnToWhereClause(queryParams)
        });
        return user || undefined;
    }

    async bulkFindByIds(ids: string[]): Promise<User[]> {
        return await this.userRepository.findBy({ id: In(ids) });
    }

    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create({
            ...user,
            id: uuidv4(),
            role: UserRole.JOINER,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, userData: Omit<Partial<User>, 'id'>): Promise<User | undefined> {
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
