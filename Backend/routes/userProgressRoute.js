import { Router } from "express";
import { getAllUserProgress, addUserProgress, getOneUserProgress, deleteOneUserProgress, getDayProgressOfUser} from "../controllers/userProgressController.js";
import checkToken  from "../middleware/checkToken.js";
import checkPermissionsToDelete from "../middleware/checkPermissionsToDelete.js";

const router = Router();

router.get("/", checkToken, getAllUserProgress);
router.post("/", checkToken, addUserProgress);
router.get("/:id", checkToken, getOneUserProgress);
router.delete("/delete/:id", checkToken, checkPermissionsToDelete, deleteOneUserProgress);
router.get("/day-progress-of-user/:id/:day", checkToken, getDayProgressOfUser);

export default router;