import { Component, OnInit } from '@angular/core';
import { NotasService } from '../../shared/services/notas.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TurmaInterface } from '../../shared/interfaces/turma.interface';
import { NotaInterface } from '../../shared/interfaces/nota.interface';
import { TurmasService } from '../../shared/services/turmas.service';
// import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-notas-alunos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-alunos.component.html',
  styleUrl: './notas-alunos.component.css'
})
export class NotasAlunosComponent implements OnInit{

  notas: any[] = [];
  turmas: TurmaInterface[] = [];
  alunoName: string = '';
  

  constructor(
    private notasService: NotasService,
    private turmaService: TurmasService,
    private activatedRoute: ActivatedRoute,
    // private authService: AuthService
  ) { }

  ngOnInit(): void {
     this.alunoName = this.getNameUsuarioLogado();
    // console.log("Aluno name " + this.alunoName);
    this.getNotasAluno();

    this.turmaService.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    });
  }

  getNotasAluno(){
    this.notasService.getNotasByAlunoName(this.alunoName).subscribe((notas) => {
    //   console.log("Nome do aluno: " + this.alunoName);
    //  console.log(notas);
      this.notas = notas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    });
  }

  agruparPorMateria() {
    const materias = new Map<string, any>();
  
    this.notas.forEach(nota => {
      const materiaNome = nota.materia;
  
      if (!materias.has(materiaNome)) {
        materias.set(materiaNome, { nome: materiaNome, notas: [] });
      }
  
      materias.get(materiaNome).notas.push(nota);
    });
  
    return Array.from(materias.values());
  }

  // agruparPorDocente() {
  //   const docentes= new Map<string, any>();
  
  //   this.notas.forEach(nota => {
  //     const docenteNome = nota.docente;
  
  //     if (!docentes.has(docenteNome)) {
  //       docentes.set(docenteNome, { nome: docenteNome, notas: [] });
  //     }
  
  //     docentes.get(docenteNome).notas.push(nota);
  //   });
  
  //   return Array.from(docentes.values());
  // }

  // agruparNotasPorTurma(turmas: TurmaInterface[], notas: NotaInterface[]): any[] {
  //   const notasAgrupadas = turmas.map(turma => {
  //     return {
  //       turma: turma.nome,
  //       docente: turma.professor,
  //       avaliacoes: notas.filter(nota => nota.docente === turma.professor)
  //     };
  //   });
  
  //   return notasAgrupadas;
  // }


    getIdUsuarioLogado(): string {
      const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
      return usuarioLogado.id || '';
    }

    getNameUsuarioLogado(): string {
      const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
      return usuarioLogado.nome || '';
    }

}
