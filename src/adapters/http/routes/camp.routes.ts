import { CampController } from './../controllers/Camp.controllers';
import { TypeOrmCampRepository } from '../../secondaryAdapter';
import { CampService } from '../../../core/services/CampService';
import { Router } from "express";
import { Middleware } from '../middleware/middleware';

const router = Router();
const campRepository = new TypeOrmCampRepository();
const campService = new CampService(campRepository);
const campController = new CampController(campService);

router.get("/camps", Middleware.verifyToken, campController.getAllCamps.bind(campController));
router.get("/camp/:id", Middleware.verifyToken, campController.getCamp.bind(campController));
router.post("/camp/create", Middleware.verifyToken, campController.createCamp.bind(campController));
router.put("/camp/:id", Middleware.verifyToken, campController.updateCamp.bind(campController));
router.delete("/camp/:id", Middleware.verifyToken, campController.deleteCamp.bind(campController));

export { router as campRoutes };