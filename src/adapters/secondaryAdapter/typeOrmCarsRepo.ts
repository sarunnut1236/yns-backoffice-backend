import { Cars, User } from "../../core/entity";
import { CarsRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";

export class typeOrmCarsRepo implements CarsRepositoryPort {
    private carsRepository = AppDataSource.getRepository(Cars);
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<Cars[]> {
        return this.carsRepository.find({ relations: ["user"] });
    }
    async findOne(param: string): Promise<Cars | null> {
        return this.carsRepository.findOne({
            where: { id: param },
            relations: ["user"],
        });
    }
    async saveCar(car: Cars, userId: string): Promise<Cars> {
        const owner = await this.userRepository.findOne({
            where: { id: userId },
        });
        const newCar = new Cars();
        newCar.name = car?.name;
        newCar.brand = car?.brand;
        newCar.color = car?.color;
        newCar.user = owner as User;

        return this.carsRepository.save(newCar);
    }
    async deleteCar(id: string): Promise<boolean> {
        const carToDelete = await this.carsRepository.findOne({
            where: { id },
        });

        if (!carToDelete) {
            throw new Error("typeOrmCarsRepo.deleteCar(): Car not found");
        }

        await this.carsRepository.remove(carToDelete);
        return true;
    }
    async updateCar(id: string, car: Cars): Promise<Cars> {
        const carToUpdate = await this.carsRepository.findOne({
            where: { id },
        });

        if (!carToUpdate) {
            throw new Error("typeOrmCarsRepo.updateCar(): Car not found");
        }

        carToUpdate.name = car.name;
        carToUpdate.brand = car.brand;
        carToUpdate.color = car.color;

        return this.carsRepository.save(carToUpdate);
    }
}
