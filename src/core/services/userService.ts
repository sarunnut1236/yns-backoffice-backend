import { User } from "../entity";
import { UserRepositoryPort } from "../ports";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.createUser(user);
    }

    async updateUser(id: string, user: User): Promise<User> {
        return await this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id);
    }

    async getUser(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}
