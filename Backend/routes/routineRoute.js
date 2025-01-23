import { Router } from "express";
import {getAllRoutines, addRoutine, getOneRoutine, deleteOneRoutine, getAllRoutinesFromOneUser} from "../controllers/routineController.js";
import checkToken  from "../middleware/checkToken.js";
import checkPermissionsToDelete from "../middleware/checkPermissionsToDelete.js";

const router = Router();

router.get("/", checkToken, getAllRoutines);
router.post("/", checkToken, addRoutine);
router.get("/:id", checkToken, getOneRoutine);
router.delete("/delete/:id", checkToken, checkPermissionsToDelete, deleteOneRoutine);
router.get("/user/:id", checkToken, getAllRoutinesFromOneUser);

export default router;