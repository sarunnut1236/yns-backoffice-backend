import { User } from "../entity";
import { UserRepositoryPort } from "../ports";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return await this.userRepository.createUser(user);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
        return await this.userRepository.updateUser(id, userData);
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id);
    }

    async getUser(id: string): Promise<User | undefined> {
        return await this.userRepository.findById(id);
    }

    async getUserByLiffUserId(liffUserId: string): Promise<User | undefined> {
        return await this.userRepository.findByLiffUserId(liffUserId);
    }

    async getUsersByIds(ids: string[]): Promise<User[]> {
        return await this.userRepository.bulkFindByIds(ids);
    }

    async createDefaultUser(liffUserId: string): Promise<User> {
        return await this.userRepository.createDefaultUser(liffUserId);
    }
}
