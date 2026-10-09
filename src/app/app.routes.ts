
import { Routes } from '@angular/router';
import { Pacientes } from './pages/pacientes/pacientes';
import { Consultas } from './pages/consultas/consultas';

export const routes: Routes = [
  {
    path: 'pacientes',
    component: Pacientes
  },
  {
    path: 'consultas',
    component: Consultas
  }
];
