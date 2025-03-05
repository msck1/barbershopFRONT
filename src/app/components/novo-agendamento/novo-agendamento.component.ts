import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../services/agendamento.service';

@Component({
  selector: 'app-novo-agendamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2 class="card-title">Novo Agendamento</h2>
        <form [formGroup]="agendamentoForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Nome do Cliente</label>
            <input 
              type="text" 
              formControlName="nomeCliente" 
              class="form-input"
              placeholder="Digite seu nome"
            >
            <div 
              *ngIf="agendamentoForm.get('nomeCliente')?.invalid && 
                      agendamentoForm.get('nomeCliente')?.touched" 
              class="error-message">
              Nome é obrigatório (mínimo 3 caracteres)
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Serviço</label>
            <select 
              formControlName="servico" 
              class="form-input"
            >
              <option value="">Selecione um serviço</option>
              <option value="Corte">Corte - R$ 35,00</option>
              <option value="Barba">Barba - R$ 25,00</option>
              <option value="Corte e Barba">Corte e Barba - R$ 50,00</option>
            </select>
            <div 
              *ngIf="agendamentoForm.get('servico')?.invalid && 
                      agendamentoForm.get('servico')?.touched" 
              class="error-message">
              Selecione um serviço
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Data e Hora</label>
            <input 
              type="datetime-local" 
              formControlName="dataHora" 
              class="form-input"
            >
            <div 
              *ngIf="agendamentoForm.get('dataHora')?.invalid && 
                      agendamentoForm.get('dataHora')?.touched" 
              class="error-message">
              Selecione data e hora
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Telefone</label>
            <input 
              type="tel" 
              formControlName="telefone" 
              class="form-input"
              placeholder="(DD) 99999-9999"
            >
            <div 
              *ngIf="agendamentoForm.get('telefone')?.invalid && 
                      agendamentoForm.get('telefone')?.touched" 
              class="error-message">
              Telefone inválido
            </div>
          </div>
          
          <button 
            type="submit" 
            class="submit-button"
            [disabled]="agendamentoForm.invalid">
            Agendar Horário
          </button>
        </form>
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
      max-width: 500px;
      animation: fadeIn 0.5s ease-out;
    }

    .card-title {
      text-align: center;
      color: #00796b;
      margin-bottom: 25px;
      font-weight: 500;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      color: #00796b;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #00bcd4;
      border-radius: 4px;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #ff5722;
      box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.2);
    }

    .error-message {
      color: #f44336;
      font-size: 0.8em;
      margin-top: 5px;
      animation: shake 0.3s;
    }

    .submit-button {
      width: 100%;
      padding: 12px;
      background-color: #00796b;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #004d40;
    }

    .submit-button:disabled {
      background-color: #b0bec5;
      cursor: not-allowed;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `]
})
export class NovoAgendamentoComponent {
  // Mesma lógica do componente anterior
  agendamentoForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {
    this.agendamentoForm = this.fb.group({
      nomeCliente: ['', [Validators.required, Validators.minLength(3)]],
      servico: ['', Validators.required],
      dataHora: ['', Validators.required],
      telefone: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10,11}$/)
      ]]
    });
  }

  onSubmit() {
    if (this.agendamentoForm.valid) {
      this.agendamentoService.criarAgendamento(this.agendamentoForm.value)
        .subscribe({
          next: () => {
            alert('Agendamento realizado com sucesso!');
            this.router.navigate(['/lista']);
          },
          error: (err) => {
            console.error('Erro ao criar agendamento', err);
            alert('Erro ao criar agendamento');
          }
        });
    }
  }
}