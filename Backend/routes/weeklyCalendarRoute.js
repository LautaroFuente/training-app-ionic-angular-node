import { Router } from "express";
import { addWeeklyCalendar, deleteOneWeeklyCalendar, getOneWeeklyCalendar} from "../controllers/weeklyCalendarController.js";
import checkToken  from "../middleware/checkToken.js";
import checkPermissionsToDelete from "../middleware/checkPermissionsToDelete.js";

const router = Router();
router.post("/", checkToken, addWeeklyCalendar);
router.delete("/delete/:id", checkToken, checkPermissionsToDelete, deleteOneWeeklyCalendar);
router.get("/:id", checkToken, getOneWeeklyCalendar);

export default router;