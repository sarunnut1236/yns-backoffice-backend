import { CampDayService } from "../../../core/services";
import { Request, Response } from "express";
import { CampDay } from "../../../core/entity";

export class CampDayController {
    constructor(private campDayService: CampDayService) {}

    async getAllCampDays(request: Request, response: Response): Promise<Response> {
        const campDays = await this.campDayService.getCampDays();

        if (!campDays || campDays.length === 0) {
            return response.status(204).json({ message: "No camp days found" });
        }

        return response.status(200).json(campDays);
    }

    async getCampDay(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const campDay = await this.campDayService.getCampDay(id);

        if (!campDay) {
            return response.status(404).json({ message: "Camp day not found" });
        }

        return response.status(200).json(campDay);
    }

    async getCampDaysByCampId(request: Request, response: Response): Promise<Response> {
        const { campId } = request.params;
        const campDays = await this.campDayService.getCampDaysByCampId(campId);

        if (!campDays || campDays.length === 0) {
            return response.status(404).json({ message: "No camp days found for this camp" });
        }

        return response.status(200).json(campDays);
    }

    async createCampDay(request: Request, response: Response): Promise<Response> {
        const campDayData = request.body;
        const newCampDay = await this.campDayService.createCampDay(campDayData);

        if (!newCampDay) {
            return response.status(400).json({ message: "Failed to create camp day" });
        }

        return response.status(201).json(newCampDay);
    }

    async updateCampDay(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const campDayData = request.body as Partial<CampDay>;
        const updatedCampDay = await this.campDayService.updateCampDay(id, campDayData);

        if (!updatedCampDay) {
            return response.status(404).json({ message: "Camp day not found" });
        }

        return response.status(200).json(updatedCampDay);
    }

    async deleteCampDay(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleted = await this.campDayService.deleteCampDay(id);

        if (!deleted) {
            return response.status(404).json({ message: "Camp day not found" });
        }

        return response.status(204).json();
    }
}