import { User } from "../../core/entity";
import { UserRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";

export class TypeOrmUserRepositoryPort implements UserRepositoryPort {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({ relations: ["cars"] });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: ["cars"],
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ["cars"],
        });
    }

    async updateUser(id: string, user: User): Promise<User> {
        const userToUpdate = await this.userRepository.findOne({
            where: { id },
        });

        if (!userToUpdate) {
            throw new Error(
                "TypeOrmUserRepositoryPort.updateUser(): User not found"
            );
        }

        userToUpdate.email = user.email;
        userToUpdate.fullName = user.fullName;

        return await this.userRepository.save(userToUpdate);
    }

    async deleteUser(id: string): Promise<boolean> {
        const userToDelete = await this.userRepository.findOne({
            where: { id },
        });

        if (!userToDelete) {
            throw new Error(
                "TypeOrmUserRepositoryPort.deleteUser(): User not found"
            );
        }

        await this.userRepository.remove(userToDelete);
        return true;
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
