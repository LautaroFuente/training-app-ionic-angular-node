import { HomePage } from './pages/home/home.page';
import { CreateRoutineComponent } from './pages/create-routine/create-routine.component';
import { ListExercisesComponent } from './pages/list-exercises/list-exercises.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginMenuComponent } from './pages/login-menu/login-menu.component';
import { MyRoutinesComponent } from './pages/my-routines/my-routines.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './pages/register/register.component';
import { SchedulerRoutinesComponent } from './pages/scheduler-routines/scheduler-routines.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {path: 'home', component: HomePage},
  {path: 'create-routine', component: CreateRoutineComponent},
  {path: 'list-exercises', component: ListExercisesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-menu', component: LoginMenuComponent},
  {path: 'my-routines', component: MyRoutinesComponent},
  {path: 'progress', component: ProgressComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'scheduler-routines', component: SchedulerRoutinesComponent},
];
