import { Router } from "express";
import {getAllMuscleGroups, addMuscleGroup, getOneMuscleGroup, deleteOneMuscleGroup} from "../controllers/muscleGroupController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllMuscleGroups);
router.post("/", checkToken, addMuscleGroup);
router.get("/:name", checkToken, getOneMuscleGroup);
router.delete("/delete/:id", checkToken, deleteOneMuscleGroup);

export default router;