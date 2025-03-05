import { Routes } from '@angular/router';
import { NovoAgendamentoComponent } from './components/novo-agendamento/novo-agendamento.component';
import { AgendamentoListaComponent } from './components/agendamento-lista/agendamento-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: '/novo', pathMatch: 'full' },
  { path: 'novo', component: NovoAgendamentoComponent },
  { path: 'lista', component: AgendamentoListaComponent }
];