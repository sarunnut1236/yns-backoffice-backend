import { User } from "../entity";
import { UserRepositoryPort } from "../ports";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async getUsers(queryParams: Partial<User>): Promise<User[]> {
        try {
            return await this.userRepository.findAll(queryParams);
        } catch (error) {
            console.error(
                `UserService.getUsers: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async createUser(user: Partial<User>): Promise<User> {
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            console.error(
                `UserService.createUser: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async updateUser(
        id: string,
        userData: Omit<Partial<User>, "id">
    ): Promise<User | undefined> {
        try {
            return await this.userRepository.updateUser(id, userData);
        } catch (error) {
            console.error(
                `UserService.updateUser: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            return await this.userRepository.deleteUser(id);
        } catch (error) {
            console.error(
                `UserService.deleteUser: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async getUser(id: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({ id });
        } catch (error) {
            console.error(
                `UserService.getUser: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async getUserByLiffUserId(liffUserId: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({ liffUserId });
        } catch (error) {
            console.error(
                `UserService.getUserByLiffUserId: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }

    async getUsersByIds(ids: string[]): Promise<User[]> {
        try {
            return await this.userRepository.bulkFindByIds(ids);
        } catch (error) {
            console.error(
                `UserService.getUsersByIds: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            throw error;
        }
    }
}
