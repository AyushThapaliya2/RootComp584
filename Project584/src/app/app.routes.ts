import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Forecast } from './forecast/forecast';
import { Shelters } from './shelters/shelters';
import { Earthquakes } from './earthquakes/earthquakes';
import { Alerts } from './alerts/alerts';
import { Login } from './auth/login';
import { Register } from './auth/register';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', component: Home, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'forecast', component: Forecast, canActivate: [authGuard] },
  { path: 'earthquakes', component: Earthquakes, canActivate: [authGuard] },
  { path: 'alerts', component: Alerts, canActivate: [authGuard] },
  { path: 'shelters', component: Shelters, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
