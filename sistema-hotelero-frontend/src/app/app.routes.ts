import { Routes } from '@angular/router';
import { Login } from './modules/auth/pages/login/login';
import { Portal } from './modules/auth/pages/portal/portal';
import { Registro } from './modules/auth/pages/registro/registro'; // Nuevo
import { Seleccion } from './modules/hotel/pages/seleccion/seleccion';
import { Suscripcion } from './modules/hotel/pages/suscripcion/suscripcion';
import { NuevoHotel } from './modules/hotel/pages/nuevo/nuevo';
import { GestionHabitacionesComponent } from './modules/hotel/pages/gestion-habitaciones/gestion-habitaciones';
import { CheckinComponent } from './modules/operaciones/pages/checkin/checkin';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro }, // Agregado
  { path: 'portal', component: Portal },
  { path: 'seleccion-hotel', component: Seleccion },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'suscripcion', component: Suscripcion },
  { path: 'nuevo-hotel', component: NuevoHotel }, // <-- AÑADE ESTA LÍNEA
  { path: 'seleccion-hotel', component: Seleccion },
  { path: 'gestion-pisos', component: GestionHabitacionesComponent },
  { path: 'checkin/:id', component: CheckinComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
