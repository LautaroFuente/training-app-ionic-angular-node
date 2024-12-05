import { Router } from "express";
import { getAllUsers, addUser, getOneUser, deleteOneUser} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.get("/:id", getOneUser);
router.delete("/delete/:id", deleteOneUser);

export default router;