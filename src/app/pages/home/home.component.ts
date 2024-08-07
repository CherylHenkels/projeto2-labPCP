import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { AlunoService } from '../../shared/services/aluno.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { DocentesService } from '../../shared/services/docentes.service';
import { TurmasService } from '../../shared/services/turmas.service';
import { EstatisticasInterface } from '../../shared/interfaces/estatisticas.interface';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements OnInit {

  alunos: UsuarioInterface[] = [];

   estatisticas: EstatisticasInterface = {
    numeroAlunos: 0,
    numeroDocentes: 0,
    numeroTurmas: 0
  };

  valorBusca: string = '';

  alunosEncontrados: UsuarioInterface[] = [];

  constructor(private alunoService: AlunoService,
              private docenteService: DocentesService, 
              private turmaService : TurmasService, 
              private menuLateralService: MenuLateralService) { }

  ngOnInit(): void {
    this.carregarAlunos();
    this.carregarEstatisticas();
    console.log(this.alunos);
  }

  carregarEstatisticas(): void{
      this.alunoService.numeroAlunosMatriculados().subscribe(numeroAlunos => {
        console.log(numeroAlunos);
        this.estatisticas.numeroAlunos = numeroAlunos;
      });
      this.docenteService.numeroDocentesMatriculados().subscribe(numeroDocentes => {
        console.log(numeroDocentes);
        this.estatisticas.numeroDocentes = numeroDocentes;
      });
      this.turmaService.numeroTurmasCadastradas().subscribe(numeroTurmas => {
        console.log(numeroTurmas);
        this.estatisticas.numeroTurmas = numeroTurmas;
      });
  }

  carregarAlunos(): void {
    this.alunoService.getAlunosMatriculados().subscribe(alunos => {
      this.alunos = alunos;
    });
}

buscaAluno() {
  if (this.valorBusca) {
    this.alunosEncontrados = this.alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(this.valorBusca.toLowerCase()) ||
      aluno.telefone.toLowerCase().includes(this.valorBusca.toLowerCase()) ||
      aluno.email.toLowerCase().includes(this.valorBusca.toLowerCase())
    );
  } else {
    this.alunosEncontrados = this.alunos;
  }
}

selecionaPrimeiroAluno() {
  this.valorBusca = this.alunosEncontrados[0].nome;
  this.buscaAluno();
}

get isAdmin(): boolean {
  let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  return perfilLogado === 'Administrador';
}

get isDocente(): boolean {
  let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  return perfilLogado === 'Docente';
}

get isAluno(): boolean {
let perfilLogado = this.menuLateralService.getPerfilUsuarioLogado();
  return perfilLogado === 'Aluno';
}

}
