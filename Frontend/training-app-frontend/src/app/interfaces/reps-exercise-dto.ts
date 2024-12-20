import { Exercise } from "./Exercise";

export interface RepsExerciseDTO {
    exercise: Exercise;
    repetitions: number;
    sets: number;
    weight: number;
}
