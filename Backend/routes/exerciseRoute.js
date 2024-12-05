import { Router } from "express";
import { getAllExercises, addExercise, getOneExercise, deleteOneExercise } from "../controllers/exerciseController.js";

const router = Router();

router.get("/", getAllExercises);
router.post("/", addExercise);
router.get("/:id", getOneExercise);
router.delete("/delete/:id", deleteOneExercise);

export default router;