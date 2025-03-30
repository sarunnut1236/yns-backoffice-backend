import { UserService } from "../../../core/services";
import { Request, Response } from "express";
import { Encrypt } from "../../helpers/encrypt";
import { User } from "../../../core/entity";

export class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        const users = await this.userService.getUsers();

        if (!users) {
            return response.status(404).json({ message: "No users found" });
        }

        return response.status(200).json(users);
    }

    async getUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = await this.userService.getUser(id);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json(user);
    }

    async createUser(request: Request, response: Response): Promise<Response> {
        const { fullName, email, password } = request.body;
        const encryptedPassword = Encrypt.passwordEncrypt(password);
        const newUser = await this.userService.createUser({
            fullName,
            email,
            password: encryptedPassword,
        } as User);

        if (!newUser) {
            return response
                .status(400)
                .json({ message: "User already exists" });
        }

        const token = Encrypt.generateToken({ id: newUser.id });

        return response.status(201).json({ user: newUser, token });
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user = request.body as User;
        const updatedUser = await this.userService.updateUser(id, user);

        if (!updatedUser) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json(updatedUser);
    }

    async deleteUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleted = await this.userService.deleteUser(id);

        if (!deleted) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(204).json();
    }

    async getUserByEmail(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { email } = request.params;
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json(user);
    }
}
