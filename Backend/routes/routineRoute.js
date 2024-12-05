import { Router } from "express";
import {getAllRoutines, addRoutine, getOneRoutine, deleteOneRoutine} from "../controllers/routineController.js";

const router = Router();

router.get("/", getAllRoutines);
router.post("/", addRoutine);
router.get("/:id", getOneRoutine);
router.delete("/delete/:id", deleteOneRoutine);

export default router;