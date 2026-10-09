
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsultaService, Consulta } from '../../services/consulta';

@Component({
  selector: 'app-consultas',
  imports: [FormsModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css'
})
export class Consultas {
  consultas: Consulta[] = [];

  consulta: Consulta = {
    data: '',
    descricao: ''
  };

  mensagem = '';
  erro = '';
  editandoId: number | null = null;

  constructor(private consultaService: ConsultaService) {
    this.listarConsultas();
  }

  listarConsultas(): void {
    this.consultaService.listarTodos().subscribe({
      next: (dados) => {
        this.consultas = dados;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as consultas.';
      }
    });
  }

  salvar(): void {
    if (!this.consulta.data || !this.consulta.descricao.trim()) {
      this.erro = 'Preencha a data e a descrição da consulta.';
      this.mensagem = '';
      return;
    }

    this.erro = '';
    this.mensagem = '';

    if (this.editandoId !== null) {
      this.consultaService.atualizar(this.editandoId, this.consulta).subscribe({
        next: () => {
          this.mensagem = 'Consulta atualizada com sucesso!';
          this.limparFormulario();
          this.listarConsultas();
        },
        error: () => {
          this.erro = 'Não foi possível atualizar a consulta.';
        }
      });
    } else {
      this.consultaService.salvar(this.consulta).subscribe({
        next: () => {
          this.mensagem = 'Consulta cadastrada com sucesso!';
          this.limparFormulario();
          this.listarConsultas();
        },
        error: () => {
          this.erro = 'Não foi possível cadastrar a consulta.';
        }
      });
    }
  }

  editar(consulta: Consulta): void {
    this.consulta = {
      data: consulta.data,
      descricao: consulta.descricao
    };
    this.editandoId = consulta.id ?? null;
    this.mensagem = '';
    this.erro = '';
  }

  excluir(consulta: Consulta): void {
    if (consulta.id === undefined) {
      return;
    }

    if (!confirm('Deseja excluir esta consulta?')) {
      return;
    }

    this.consultaService.excluir(consulta.id).subscribe({
      next: () => {
        this.mensagem = 'Consulta excluída com sucesso!';
        this.erro = '';
        this.listarConsultas();
      },
      error: () => {
        this.erro = 'Não foi possível excluir a consulta.';
      }
    });
  }

  limparFormulario(): void {
    this.consulta = {
      data: '',
      descricao: ''
    };
    this.editandoId = null;
  }
}
