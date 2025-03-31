import { RegistrationController } from './../controllers/Registration.controllers';
import { TypeOrmRegistrationRepository } from '../../secondaryAdapter';
import { RegistrationService } from '../../../core/services/RegistrationService';
import { Router } from "express";
import { Middleware } from '../middleware/middleware';

const router = Router();
const registrationRepository = new TypeOrmRegistrationRepository();
const registrationService = new RegistrationService(registrationRepository);
const registrationController = new RegistrationController(registrationService);

router.get("/registrations", Middleware.verifyToken, registrationController.getAllRegistrations.bind(registrationController));
router.get("/registration/camp/:campId/user/:userId", Middleware.verifyToken, registrationController.getRegistrationByCampAndUser.bind(registrationController));
router.get("/registration/user/:userId", Middleware.verifyToken, registrationController.getRegistrationsByUserId.bind(registrationController));
router.get("/registration/camp/:campId", Middleware.verifyToken, registrationController.getRegistrationsByCampId.bind(registrationController));
router.get("/registration/:id", Middleware.verifyToken, registrationController.getRegistration.bind(registrationController));
router.post("/registration/create", Middleware.verifyToken, registrationController.createRegistration.bind(registrationController));
router.put("/registration/:id", Middleware.verifyToken, registrationController.updateRegistration.bind(registrationController));

export { router as registrationRoutes };