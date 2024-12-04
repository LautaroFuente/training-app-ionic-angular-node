import { Router } from "express";
import { getAllExercises } from "../controllers/exerciseController.js";

const router = Router();

router.get("/", getAllExercises);
router.post("/", );
router.get("/:id",);

export default router;