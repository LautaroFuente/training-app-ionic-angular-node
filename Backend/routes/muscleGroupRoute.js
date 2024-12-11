import { Router } from "express";
import {getAllMuscleGroups, addMuscleGroup, getOneMuscleGroup, deleteOneMuscleGroup} from "../controllers/muscleGroupController.js";

const router = Router();

router.get("/", getAllMuscleGroups);
router.post("/", addMuscleGroup);
router.get("/:name", getOneMuscleGroup);
router.delete("/delete/:id", deleteOneMuscleGroup);

export default router;