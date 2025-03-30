import { CarService } from './../../../core/services/carService';
import { Router } from "express";
import { typeOrmCarsRepo, TypeOrmUserRepositoryPort } from "../../secondaryAdapter";
import { CarsController } from '../controllers';
import { Middleware } from '../middleware/middleware';

const carRepository = new typeOrmCarsRepo();
const userRepository = new TypeOrmUserRepositoryPort();
const carService = new CarService(carRepository, userRepository);
const carsController = new CarsController(carService);

const router = Router();

router.get("/cars", Middleware.verifyToken, carsController.getCars.bind(carsController));
router.get("/car/:id", Middleware.verifyToken, carsController.getCar.bind(carsController));
router.post("/car/create", Middleware.verifyToken, carsController.createCar.bind(carsController));
router.put("/car/:id", Middleware.verifyToken, carsController.updateCar.bind(carsController));
router.delete("/car/:id", Middleware.verifyToken, carsController.deleteCar.bind(carsController));

export { router as carRoutes };