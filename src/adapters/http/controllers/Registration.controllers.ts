import { RegistrationService } from "../../../core/services";
import { Request, Response } from "express";
import { Registration } from "../../../core/entity";

export class RegistrationController {
    constructor(private registrationService: RegistrationService) {}

    async getAllRegistrations(request: Request, response: Response): Promise<Response> {
        try {
            const registrations = await this.registrationService.getRegistrations(request.query as Partial<Registration>);

            if (!registrations || registrations.length === 0) {
                return response.status(204).json({ message: "No registrations found" });
            }

            return response.status(200).json(registrations);
        } catch (error) {
            console.error(`RegistrationController.getAllRegistrations: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async getRegistration(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const registration = await this.registrationService.getRegistration(id);

            if (!registration) {
                return response.status(404).json({ message: "Registration not found" });
            }

            return response.status(200).json(registration);
        } catch (error) {
            console.error(`RegistrationController.getRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async createRegistration(request: Request, response: Response): Promise<Response> {
        try {    
            if (!request.body.userId || !request.body.campId || !request.body.dayAvailability) {
                return response.status(400).json({ message: "Missing required fields" });
            }

            const newRegistration = await this.registrationService.createRegistration(request.body as Omit<Registration, 'id'>);

            if (!newRegistration) {
                return response.status(400).json({ message: "Failed to create registration" });
            }

            return response.status(201).json(newRegistration);
        } catch (error) {
            console.error(`RegistrationController.createRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async updateRegistration(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const registrationData = request.body as Partial<Registration>;
            const updatedRegistration = await this.registrationService.updateRegistration(id, registrationData);

            if (!updatedRegistration) {
                return response.status(404).json({ message: "Registration not found" });
            }

            return response.status(200).json(updatedRegistration);
        } catch (error) {
            console.error(`RegistrationController.updateRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteRegistration(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const isDeleted = await this.registrationService.deleteRegistration(id);

            if (!isDeleted) {
                return response.status(404).json({ message: "Registration not found or could not be deleted" });
            }

            return response.status(200).json({ message: "Registration successfully deleted" });
        } catch (error) {
            console.error(`RegistrationController.deleteRegistration: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}