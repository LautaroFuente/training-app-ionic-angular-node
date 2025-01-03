import { Router } from "express";
import {getAllMuscleGroups, addMuscleGroup, getOneMuscleGroup} from "../controllers/muscleGroupController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllMuscleGroups);
router.post("/", checkToken, addMuscleGroup);
router.get("/:name", checkToken, getOneMuscleGroup);

export default router;