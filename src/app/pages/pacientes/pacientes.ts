
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente, PacienteService } from '../../services/paciente';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class Pacientes implements OnInit {
  pacientes: Paciente[] = [];

  paciente: Paciente = {
    nome: '',
    cpf: '',
    idade: 0
  };

  editando = false;
  mensagem = '';
  erro = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.pacienteService.listarTodos().subscribe({
      next: (dados) => {
        this.pacientes = dados;
        this.erro = '';
      },
      error: () => {
        this.erro = 'Não foi possível carregar os pacientes.';
      }
    });
  }

  salvar(): void {
    this.mensagem = '';
    this.erro = '';

    if (!this.paciente.nome.trim() || !this.paciente.cpf.trim() || this.paciente.idade <= 0) {
      this.erro = 'Preencha nome, CPF e idade corretamente.';
      return;
    }

    const operacao = this.editando && this.paciente.id
      ? this.pacienteService.atualizar(this.paciente.id, this.paciente)
      : this.pacienteService.salvar(this.paciente);

    operacao.subscribe({
      next: () => {
        this.mensagem = this.editando
          ? 'Paciente atualizado com sucesso!'
          : 'Paciente cadastrado com sucesso!';

        this.limparFormulario();
        this.listarPacientes();
      },
      error: () => {
        this.erro = 'Não foi possível salvar o paciente. Verifique a API.';
      }
    });
  }

  editar(paciente: Paciente): void {
    this.paciente = { ...paciente };
    this.editando = true;
    this.mensagem = '';
    this.erro = '';
  }

  excluir(paciente: Paciente): void {
    if (!paciente.id) {
      this.erro = 'Não foi possível identificar o paciente.';
      return;
    }

    if (confirm(`Deseja excluir o paciente ${paciente.nome}?`)) {
      this.pacienteService.excluir(paciente.id).subscribe({
        next: () => {
          this.mensagem = 'Paciente excluído com sucesso!';
          this.listarPacientes();
        },
        error: () => {
          this.erro = 'Não foi possível excluir o paciente.';
        }
      });
    }
  }

  limparFormulario(): void {
    this.paciente = {
      nome: '',
      cpf: '',
      idade: 0
    };
    this.editando = false;
  }

  cancelarEdicao(): void {
    this.limparFormulario();
    this.mensagem = '';
    this.erro = '';
  }
}
