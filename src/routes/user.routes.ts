import { Router } from "express";
import { createUser, deleteUser, getAllUsers, findUserByID } from "../controllers/user.controller";
import { handleUserById } from "../middlewares/user.middleware";

const router = Router();

// middlewares
router.use('/:id', handleUserById);

// routes
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', findUserByID);
router.delete('/:id', deleteUser)

export default router;