import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { AlunoService } from '../../shared/services/aluno.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  alunos: UsuarioInterface[] = [];
  constructor(private alunoService: AlunoService,) { }

  ngOnInit(): void {
    this.carregarAlunos();
    console.log(this.alunos);
  }

  carregarAlunos(): void {
    this.alunoService.getAlunosMatriculados().subscribe(alunos => {
      this.alunos = alunos;
    });
}

}
