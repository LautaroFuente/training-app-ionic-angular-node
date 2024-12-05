import { Router } from "express";
import { getAllUserProgress, addUserProgress, getOneUserProgress, deleteOneUserProgress} from "../controllers/userProgressController.js";

const router = Router();

router.get("/", getAllUserProgress);
router.post("/", addUserProgress);
router.get("/:id", getOneUserProgress);
router.delete("/delete/:id", deleteOneUserProgress);

export default router;