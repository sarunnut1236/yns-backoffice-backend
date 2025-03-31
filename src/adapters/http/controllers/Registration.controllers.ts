import { RegistrationService } from "../../../core/services";
import { Request, Response } from "express";
import { Registration } from "../../../core/entity";

export class RegistrationController {
    constructor(private registrationService: RegistrationService) {}

    async getAllRegistrations(request: Request, response: Response): Promise<Response> {
        const registrations = await this.registrationService.getRegistrations();

        if (!registrations || registrations.length === 0) {
            return response.status(204).json({ message: "No registrations found" });
        }

        return response.status(200).json(registrations);
    }

    async getRegistration(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const registration = await this.registrationService.getRegistration(id);

        if (!registration) {
            return response.status(404).json({ message: "Registration not found" });
        }

        return response.status(200).json(registration);
    }

    async getRegistrationsByUserId(request: Request, response: Response): Promise<Response> {
        const { userId } = request.params;
        const registrations = await this.registrationService.getRegistrationsByUserId(userId);

        if (!registrations || registrations.length === 0) {
            return response.status(204).json({ message: "No registrations found for this user" });
        }

        return response.status(200).json(registrations);
    }

    async getRegistrationsByCampId(request: Request, response: Response): Promise<Response> {
        const { campId } = request.params;
        const registrations = await this.registrationService.getRegistrationsByCampId(campId);

        if (!registrations || registrations.length === 0) {
            return response.status(204).json({ message: "No registrations found for this camp" });
        }

        return response.status(200).json(registrations);
    }

    async getRegistrationByCampAndUser(request: Request, response: Response): Promise<Response> {
        const { campId, userId } = request.params;
        const registration = await this.registrationService.getRegistrationByCampAndUser(campId, userId);

        if (!registration) {
            return response.status(404).json({ message: "Registration not found" });
        }

        return response.status(200).json(registration);
    }

    async createRegistration(request: Request, response: Response): Promise<Response> {
        const { userId, campId, dayAvailability } = request.body;
        
        if (!userId || !campId || !dayAvailability) {
            return response.status(400).json({ message: "Missing required fields" });
        }

        const newRegistration = await this.registrationService.createRegistration(userId, campId, dayAvailability);

        if (!newRegistration) {
            return response.status(400).json({ message: "Failed to create registration" });
        }

        return response.status(201).json(newRegistration);
    }

    async updateRegistration(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const registrationData = request.body as Partial<Registration>;
        const updatedRegistration = await this.registrationService.updateRegistration(id, registrationData);

        if (!updatedRegistration) {
            return response.status(404).json({ message: "Registration not found" });
        }

        return response.status(200).json(updatedRegistration);
    }
}