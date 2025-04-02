import { CampService } from "../../../core/services";
import { Request, Response } from "express";
import { Camp } from "../../../core/entity";

export class CampController {
    constructor(private campService: CampService) {}

    async getAllCamps(request: Request, response: Response): Promise<Response> {
        try {
            const queryParams = request.query as Partial<Camp>;

            const camps = await this.campService.getCamps(queryParams);

            if (!camps || camps.length === 0) {
                return response.status(204).json({ message: "No camps found" });
            }

            return response.status(200).json(camps);
        } catch (error) {
            console.error(
                `CampController.getAllCamps: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }

    async getCamp(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const camp = await this.campService.getCamp(id);

            if (!camp) {
                return response.status(404).json({ message: "Camp not found" });
            }

            return response.status(200).json(camp);
        } catch (error) {
            console.error(
                `CampController.getCamp: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }

    async createCamp(request: Request, response: Response): Promise<Response> {
        try {
            const campData = request.body;
            const newCamp = await this.campService.createCamp(campData);

            if (!newCamp) {
                return response
                    .status(400)
                    .json({ message: "Failed to create camp" });
            }

            return response.status(201).json(newCamp);
        } catch (error) {
            console.error(
                `CampController.createCamp: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }

    async updateCamp(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const campData = request.body as Partial<Camp>;
            const updatedCamp = await this.campService.updateCamp(id, campData);

            if (!updatedCamp) {
                return response.status(404).json({ message: "Camp not found" });
            }

            return response.status(200).json(updatedCamp);
        } catch (error) {
            console.error(
                `CampController.updateCamp: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }

    async deleteCamp(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const deleted = await this.campService.deleteCamp(id);

            if (!deleted) {
                return response.status(404).json({ message: "Camp not found" });
            }

            return response
                .status(200)
                .json({ message: "Camp deleted successfully" });
        } catch (error) {
            console.error(
                `CampController.deleteCamp: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }
}
