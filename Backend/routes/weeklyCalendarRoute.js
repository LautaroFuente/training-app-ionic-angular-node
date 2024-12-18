import { Router } from "express";
import { addWeeklyCalendar, deleteOneWeeklyCalendar} from "../controllers/weeklyCalendarController.js";
import checkToken  from "../middleware/checkToken.js";

const router = Router();
router.post("/", checkToken, addWeeklyCalendar);
router.delete("/delete/:id", checkToken, deleteOneWeeklyCalendar);

export default router;