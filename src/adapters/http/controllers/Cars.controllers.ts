import { CarService } from "../../../core/services";
import { Request, Response } from "express";

export class CarsController {
    constructor(private carsService: CarService) {}

    async getCars(request: Request, response: Response): Promise<Response> {
        const cars = await this.carsService.getCars();

        if(!cars) {
            return response.status(404).json({message: "No cars found"});
        }

        return response.status(200).json(cars);
    }

    async getCar(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const car = await this.carsService.getCar(id);

        if(!car) {
            return response.status(404).json({message: "Car not found"});
        }

        return response.status(200).json(car);
    }

    async createCar(request: Request, response: Response): Promise<Response> {
        const car = request.body;

        //@ts-ignore
        const { id } = request["currentUser"];
        const newCar = await this.carsService.createCar(car, id);
        return response.status(201).json(newCar);
    }  

    async updateCar(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const car = request.body;
        const updatedCar = await this.carsService.updateCar(id, car);

        if(!updatedCar) {
            return response.status(404).json({message: "Car not found"});
        }

        return response.status(200).json(updatedCar);
    }

    async deleteCar(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deletedCar = await this.carsService.deleteCar(id);

        if(!deletedCar) {
            return response.status(404).json({message: "Car not found"});
        }

        return response.status(200).json();
    }
}