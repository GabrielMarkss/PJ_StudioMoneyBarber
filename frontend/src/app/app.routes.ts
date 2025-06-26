import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { DashtesteComponent } from './dashteste/dashteste.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'cadastrar', component: RegisterComponent }, // Página de cadastro
  { path: 'dashteste', component: DashtesteComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '**', redirectTo: '' }, // Rota coringa para páginas inexistentes
];
