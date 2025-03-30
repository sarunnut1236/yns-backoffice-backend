import { User } from "../entity";

export interface UserRepositoryPort {
    findAll(): Promise<User[]>;

    findByLiffUserId(liffUserId: string): Promise<User|undefined>;

    findById(id: string): Promise<User|undefined>;

    bulkFindByIds(ids: string[]): Promise<User[]>;

    createUser(user: Omit<User, 'id'>): Promise<User>;

    createDefaultUser(liffUserId: string): Promise<User>;

    deleteUser(id: string): Promise<boolean>;

    updateUser(id: string, userData: Partial<User>): Promise<User|undefined>;
}