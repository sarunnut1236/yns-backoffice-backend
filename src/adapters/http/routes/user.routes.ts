import { UserController } from './../controllers/User.controllers';
import { TypeOrmUserRepository } from '../../secondaryAdapter';
import { UserService } from '../../../core/services/UserService';
import { Router } from "express";
import { Middleware } from '../middleware/middleware';


const router = Router();
const userRepository = new TypeOrmUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/users", userController.getAllUsers.bind(userController));
router.post("/user/create", userController.createUser.bind(userController));
router.get("/user/:id", Middleware.verifyToken, userController.getUser.bind(userController));
router.put("/user/:id", Middleware.verifyToken, userController.updateUser.bind(userController));
router.delete("/user/:id", Middleware.verifyToken, userController.deleteUser.bind(userController));
router.get("/user/:email", Middleware.verifyToken, userController.getUserByEmail.bind(userController));

export default router;