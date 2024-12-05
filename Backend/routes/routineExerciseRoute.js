import { Router } from "express";
import { getAllRoutineExercises, addRoutineExercise, getOneRoutineExercise, deleteOneRoutineExercise} from "../controllers/routineExerciseController.js";

const router = Router();

router.get("/", getAllRoutineExercises);
router.post("/", addRoutineExercise);
router.get("/:id", getOneRoutineExercise);
router.delete("/delete/:id", deleteOneRoutineExercise);

export default router;