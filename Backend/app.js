import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import exerciseRoute from "./routes/exerciseRoute.js";
import muscleGroupRoute from "./routes/muscleGroupRoute.js";
import routineExerciseRoute from "./routes/routineExerciseRoute.js";
import routineRoute from "./routes/routineRoute.js";
import userProgressRoute from "./routes/userProgressRoute.js";
import userRoute from "./routes/userRoute.js";
import weeklyCalendarRoute from "./routes/weeklyCalendarRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/server/exercise", exerciseRoute);
app.use("/server/muscleGroup", muscleGroupRoute);
app.use("/server/routineExercise", routineExerciseRoute);
app.use("/server/routine", routineRoute);
app.use("/server/userProgress", userProgressRoute);
app.use("/server/user", userRoute);
app.use("/server/weeklyCalendar", weeklyCalendarRoute);
app.use("/server/auth", authRoute);

export default app;