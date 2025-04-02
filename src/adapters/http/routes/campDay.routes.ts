import { CampDayController } from './../controllers/CampDay.controllers';
import { TypeOrmCampDayRepository } from '../../secondaryAdapter';
import { CampDayService } from '../../../core/services/CampDayService';
import { Router } from "express";
import { Middleware } from '../middleware/middleware';

const router = Router();
const campDayRepository = new TypeOrmCampDayRepository();
const campDayService = new CampDayService(campDayRepository);
const campDayController = new CampDayController(campDayService);

router.get("/campdays", campDayController.getAllCampDays.bind(campDayController));
router.get("/campday/camp/:campId", campDayController.getCampDaysByCampId.bind(campDayController));
router.get("/campday/:id", campDayController.getCampDay.bind(campDayController));
router.post("/campday/create", Middleware.verifyToken, campDayController.createCampDay.bind(campDayController));
router.put("/campday/:id", Middleware.verifyToken, campDayController.updateCampDay.bind(campDayController));
router.delete("/campday/:id", Middleware.verifyToken, campDayController.deleteCampDay.bind(campDayController));

export { router as campDayRoutes };