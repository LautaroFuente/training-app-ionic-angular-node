import { Router } from "express";
import { addWeeklyCalendar, deleteOneWeeklyCalendar, getOneWeeklyCalendar, getOneWeeklyCalendarFromOneUser, addRoutineToOneDay, removeRoutineFromOneDay} from "../controllers/weeklyCalendarController.js";
import checkToken  from "../middleware/checkToken.js";
import checkPermissionsToDelete from "../middleware/checkPermissionsToDelete.js";

const router = Router();
router.post("/", checkToken, addWeeklyCalendar);
router.delete("/delete/:id", checkToken, checkPermissionsToDelete, deleteOneWeeklyCalendar);
router.get("/:id", checkToken, getOneWeeklyCalendar);
router.get("/user/:id", checkToken, getOneWeeklyCalendarFromOneUser);
router.put("/assign/:dayid/:routineid", checkToken, addRoutineToOneDay);
router.put("/remove/:dayid/", checkToken, removeRoutineFromOneDay);

export default router;