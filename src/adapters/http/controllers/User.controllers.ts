import { UserService } from "../../../core/services";
import { Request, Response } from "express";
import { Encrypt } from "../../helpers/encrypt";
import { User } from "../../../core/entity";

export class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        const users = await this.userService.getUsers();

        if (!users || users.length === 0) {
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

    async getUserByLiffUserId(request: Request, response: Response): Promise<Response> {
        const { liffUserId } = request.params;
        const user = await this.userService.getUserByLiffUserId(liffUserId);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json(user);
    }

    async getUsersByIds(request: Request, response: Response): Promise<Response> {
        const { ids } = request.body;
        
        if (!ids || !Array.isArray(ids)) {
            return response.status(400).json({ message: "Invalid user IDs provided" });
        }
        
        const users = await this.userService.getUsersByIds(ids);

        if (!users || users.length === 0) {
            return response.status(204).json({ message: "No users found with the provided IDs" });
        }

        return response.status(200).json(users);
    }

    async createUser(request: Request, response: Response): Promise<Response> {
        const userData = request.body as Partial<User>;
        
        if (!userData?.liffUserId) {
            return response.status(400).json({ message: "LiffUserId is required" });
        }

        const newUser = await this.userService.createUser(userData);

        if (!newUser) {
            return response.status(400).json({ message: "Failed to create user" });
        }

        const token = Encrypt.generateToken({ id: newUser.id });
        return response.status(201).json({ user: newUser, token });
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const userData = request.body as Partial<User>;
        const updatedUser = await this.userService.updateUser(id, userData);

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
}
