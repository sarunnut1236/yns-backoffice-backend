import { CampService } from "../../../core/services";
import { Request, Response } from "express";
import { Camp } from "../../../core/entity";

export class CampController {
    constructor(private campService: CampService) {}

    async getAllCamps(request: Request, response: Response): Promise<Response> {
        const camps = await this.campService.getCamps();

        if (!camps || camps.length === 0) {
            return response.status(204).json({ message: "No camps found" });
        }

        return response.status(200).json(camps);
    }

    async getCamp(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const camp = await this.campService.getCamp(id);

        if (!camp) {
            return response.status(404).json({ message: "Camp not found" });
        }

        return response.status(200).json(camp);
    }

    async createCamp(request: Request, response: Response): Promise<Response> {
        const campData = request.body;
        const newCamp = await this.campService.createCamp(campData);

        if (!newCamp) {
            return response.status(400).json({ message: "Failed to create camp" });
        }

        return response.status(201).json(newCamp);
    }

    async updateCamp(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const campData = request.body as Partial<Camp>;
        const updatedCamp = await this.campService.updateCamp(id, campData);

        if (!updatedCamp) {
            return response.status(404).json({ message: "Camp not found" });
        }

        return response.status(200).json(updatedCamp);
    }

    async deleteCamp(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleted = await this.campService.deleteCamp(id);

        if (!deleted) {
            return response.status(404).json({ message: "Camp not found" });
        }

        return response.status(204).json();
    }
}