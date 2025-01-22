interface RoutineProgress {
    dayId: number;
    routineId: number | null;
    routineName: string | null;
    totalExercises: number;
    completedExercises: number;
    completionPercentage: number;
}

export default RoutineProgress;