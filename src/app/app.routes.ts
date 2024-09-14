import { Routes } from '@angular/router';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
  { path: 'sign-up', component: SignupComponent, canActivate: [AuthRedirectGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];
