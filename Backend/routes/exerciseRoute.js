import { Router } from "express";
import { getAllExercises, addExercise, getOneExercise} from "../controllers/exerciseController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllExercises);
router.post("/", checkToken, addExercise);
router.get("/:name", checkToken, getOneExercise);

export default router;