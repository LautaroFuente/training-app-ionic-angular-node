import { Router } from "express";
import { getAllExercises, addExercise, getOneExercise, deleteOneExercise } from "../controllers/exerciseController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllExercises);
router.post("/", checkToken, addExercise);
router.get("/:name", checkToken, getOneExercise);
router.delete("/delete/:id", checkToken, deleteOneExercise);

export default router;