import { UserService } from "../../../core/services";
import { Request, Response } from "express";
import { Encrypt } from "../../helpers/encrypt";
import { User } from "../../../core/entity";

export class UserController {
    constructor(private userService: UserService) { }

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const queryParams = request.query as Partial<User>;

            const users = await this.userService.getUsers(queryParams);

            if (!users || users.length === 0) {
                return response.status(404).json({ message: "No users found" });
            }

            return response.status(200).json(users);
        } catch (error) {
            console.error(`UserController.getAllUsers: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async getUser(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const user = await this.userService.getUser(id);

            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            return response.status(200).json(user);
        } catch (error) {
            console.error(`UserController.getUser: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserByLiffUserId(request: Request, response: Response): Promise<Response> {
        try {
            const { liffUserId } = request.params;
            const user = await this.userService.getUserByLiffUserId(liffUserId);

            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            return response.status(200).json(user);
        } catch (error) {
            console.error(`UserController.getUserByLiffUserId: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async getUsersByIds(request: Request, response: Response): Promise<Response> {
        try {
            const { ids } = request.body;

            if (!ids || !Array.isArray(ids)) {
                return response.status(400).json({ message: "Invalid user IDs provided" });
            }

            const users = await this.userService.getUsersByIds(ids);

            if (!users || users.length === 0) {
                return response.status(204).json({ message: "No users found with the provided IDs" });
            }

            return response.status(200).json(users);
        } catch (error) {
            console.error(`UserController.getUsersByIds: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const userData = request.body as Partial<User>;

            if (!userData?.liffUserId) {
                return response.status(400).json({ message: "LiffUserId is required" });
            }

            const existingUser = await this.userService.getUserByLiffUserId(userData.liffUserId);
            if (existingUser) {
                return response.status(400).json({ message: "User with this liffUserId already exists" });
            }

            const newUser = await this.userService.createUser(userData);

            if (!newUser) {
                return response.status(400).json({ message: "Failed to create user" });
            }

            const token = Encrypt.generateToken({ id: newUser.id });
            return response.status(201).json({ user: newUser, token });
        } catch (error) {
            console.error(`UserController.createUser: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const userData = request.body as Partial<User>;
            const updatedUser = await this.userService.updateUser(id, userData);

            if (!updatedUser) {
                return response.status(404).json({ message: "User not found" });
            }

            return response.status(200).json(updatedUser);
        } catch (error) {
            console.error(`UserController.updateUser: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteUser(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const deleted = await this.userService.deleteUser(id);

            if (!deleted) {
                return response.status(404).json({ message: "User not found" });
            }

            return response.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(`UserController.deleteUser: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async loginUser(request: Request, response: Response): Promise<Response> {
        try {
            const { liffUserId } = request.body as Partial<User>;

            if (!liffUserId) {
                return response.status(400).json({ message: "LiffUserId is required" });
            }

            const user = await this.userService.getUserByLiffUserId(liffUserId);

            if (!user) {
                return response.status(403).json({ message: "Unauthorized" });
            }

            const token = Encrypt.generateToken({ id: user.id });
            return response.status(200).json({ user, token });
        } catch (error) {
            console.error(`UserController.loginUser: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}
