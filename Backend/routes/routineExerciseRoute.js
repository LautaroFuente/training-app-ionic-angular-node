import { Router } from "express";
import { getAllRoutineExercises, addRoutineExercise, getOneRoutineExercise, deleteOneRoutineExercise} from "../controllers/routineExerciseController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllRoutineExercises);
router.post("/", checkToken, addRoutineExercise);
router.get("/:id", checkToken, getOneRoutineExercise);
router.delete("/delete/:id", checkToken, deleteOneRoutineExercise);

export default router;