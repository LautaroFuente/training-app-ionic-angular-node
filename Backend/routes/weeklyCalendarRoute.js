import { Router } from "express";
import { getAllWeeklyCalendars, addWeeklyCalendar, getOneWeeklyCalendar, deleteOneWeeklyCalendar} from "../controllers/weeklyCalendarController.js";

const router = Router();

router.get("/", getAllWeeklyCalendars);
router.post("/", addWeeklyCalendar);
router.get("/:id", getOneWeeklyCalendar);
router.delete("/delete/:id", deleteOneWeeklyCalendar);

export default router;