import { User } from "../entity";

export interface UserRepositoryPort {
    findAll(queryParams?: Partial<User>): Promise<User[]>;

    findOne(queryParams: Partial<User>): Promise<User|undefined>;

    bulkFindByIds(ids: string[]): Promise<User[]>;

    createUser(user: Partial<User>): Promise<User>;

    deleteUser(id: string): Promise<boolean>;

    updateUser(id: string, userData: Omit<Partial<User>, 'id'>): Promise<User|undefined>;
}