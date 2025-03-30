import { Cars } from "../entity";

export interface CarsRepositoryPort {
    findAll(): Promise<Cars[]>;

    findOne(param: string): Promise<Cars | null>;

    saveCar(car: Cars, userId: string): Promise<Cars>;

    deleteCar(id: string): Promise<boolean>;

    updateCar(id: string, car: Cars): Promise<Cars>;
}
