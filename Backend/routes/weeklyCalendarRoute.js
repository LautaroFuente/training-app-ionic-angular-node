import { Router } from "express";
import { getAllWeeklyCalendars, addWeeklyCalendar, getOneWeeklyCalendar, deleteOneWeeklyCalendar} from "../controllers/weeklyCalendarController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();

router.get("/", checkToken, getAllWeeklyCalendars);
router.post("/", checkToken, addWeeklyCalendar);
router.get("/:id", checkToken, getOneWeeklyCalendar);
router.delete("/delete/:id", checkToken, deleteOneWeeklyCalendar);

export default router;