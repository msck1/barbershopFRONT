import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/agendamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="card">
        <h2 class="card-title">Meus Agendamentos</h2>
        
        <div *ngIf="loading" class="loading-spinner">
          Carregando agendamentos...
        </div>

        <table *ngIf="!loading && agendamentos.length > 0" class="agenda-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let agendamento of agendamentos" class="agenda-row">
              <td>{{ agendamento.nomeCliente }}</td>
              <td>{{ agendamento.servico }}</td>
              <td>{{ agendamento.dataHora | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <button 
                  (click)="cancelarAgendamento(agendamento.id)"
                  class="btn-cancelar">
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div *ngIf="!loading && agendamentos.length === 0" class="empty-state">
          <p>Nenhum agendamento encontrado</p>
          <button 
            class="btn-novo-agendamento"
            (click)="navegarParaNovoAgendamento()">
            Fazer Novo Agendamento
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      background-color: #f0f4f8;
      padding: 20px;
    }

    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 30px;
      width: 100%;
      max-width: 900px;
      animation: fadeIn 0.5s ease-out;
    }

    .card-title {
      text-align: center;
      color: #00796b;
      margin-bottom: 25px;
      font-weight: 500;
    }

    .agenda-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .agenda-table th {
      background-color: #00bcd4;
      color: white;
      padding: 12px;
      text-align: left;
    }

    .agenda-table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
    }

    .agenda-row:hover {
      background-color: #f1f8ff;
      transition: background-color 0.3s ease;
    }

    .btn-cancelar {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-cancelar:hover {
      background-color: #d32f2f;
    }

    .loading-spinner {
      text-align: center;
      color: #00796b;
      padding: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .btn-novo-agendamento {
      background-color: #ff5722;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 15px;
      transition: background-color 0.3s ease;
    }

    .btn-novo-agendamento:hover {
      background-color: #f4511e;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AgendamentoListaComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  loading: boolean = true;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.loading = true;
    this.agendamentoService.listarAgendamentos()
      .subscribe({
        next: (agendamentos) => {
          this.agendamentos = agendamentos;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar agendamentos', err);
          this.loading = false;
          alert('Falha ao carregar agendamentos');
        }
      });
  }

  cancelarAgendamento(id?: number) {
    if (id && confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentoService.cancelarAgendamento(id)
        .subscribe({
          next: () => {
            alert('Agendamento cancelado com sucesso!');
            this.carregarAgendamentos();
          },
          error: (err) => {
            console.error('Erro ao cancelar agendamento', err);
            alert('Falha ao cancelar agendamento');
          }
        });
    }
  }

  navegarParaNovoAgendamento() {
    this.router.navigate(['/novo']);
  }
}