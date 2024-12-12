import { Router } from "express";
import { getAllUsers, addUser, getOneUser, deleteOneUser} from "../controllers/userController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllUsers);
router.post("/", checkToken, addUser);
router.get("/:id", checkToken, getOneUser);
router.delete("/delete/:id", checkToken, deleteOneUser);

export default router;