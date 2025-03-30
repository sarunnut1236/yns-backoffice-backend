import { User } from "../entity";

export interface UserRepositoryPort {
    findAll(): Promise<User[]>;

    findByEmail(email: string): Promise<User|null>;

    findById(id: string): Promise<User|null>;

    createUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<boolean>;

    updateUser(id: string, user: User): Promise<User>;
}