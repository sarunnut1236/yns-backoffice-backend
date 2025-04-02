import { User } from "../entity";
import { UserRepositoryPort } from "../ports";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async getUsers(queryParams: Partial<User>): Promise<User[]> {
        return await this.userRepository.findAll(queryParams);
    }

    async createUser(user: Partial<User>): Promise<User> {
        return await this.userRepository.createUser(user);
    }

    async updateUser(
        id: string,
        userData: Omit<Partial<User>, 'id'>
    ): Promise<User | undefined> {
        return await this.userRepository.updateUser(id, userData);
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id);
    }

    async getUser(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ id });
    }

    async getUserByLiffUserId(liffUserId: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ liffUserId });
    }

    async getUsersByIds(ids: string[]): Promise<User[]> {
        return await this.userRepository.bulkFindByIds(ids);
    }
}
