import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';
import { TurmasService } from '../../shared/services/turmas.service';


@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.css'
})
export class CadastroAlunoComponent implements OnInit{

  alunoForm!: FormGroup;
  turmas: any[] = [];
  isEdit = false;
  idUsuario: string | undefined;

  generos = ['','Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['','Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  



  constructor(private viaCepService: ViaCepService ,
              private usuarioService: UsuariosService,
              private activatedRoute: ActivatedRoute,
              private menuLateralService: MenuLateralService,
              private turmaService: TurmasService
             ) { }

  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.isEdit = true;
      this.usuarioService.getUsuario(this.idUsuario).subscribe((usuario) => {
        if(usuario){
        this.alunoForm.patchValue(usuario);
        }
      });
    }

    this.alunoForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]),
      email: new FormControl('', [Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      naturalidade: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      pontoReferencia: new FormControl(''),
      turmas: new FormControl([], Validators.required)
    });

    this.turmaService.getTurmas().subscribe((turmas) => {
      this.turmas = turmas;
    } );
  }



  


  buscarCep() {
    const cep = this.alunoForm.get('cep')?.value;
    if (cep) {
      this.viaCepService.buscarCep(cep).subscribe(dados => {
        if (dados) {
          this.alunoForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          });
        }
      });
    }
  }

  salvarAluno() {
    if (this.alunoForm.valid) {
      const novoAluno: UsuarioInterface = {
        ...this.alunoForm.value,
        perfil: 'Aluno',  
        idade: this.calcularIdade(new Date(this.alunoForm.value.dataNascimento)),
        id:this.idUsuario ? this.idUsuario : this.gerarId()
      };
      this.usuarioService.postUsuario(novoAluno).subscribe((retorno) => {
        window.alert('Usuário criado com sucesso');
      });
    } else {
      window.alert('Cheque os campos obrigatórios');
    }
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  gerarId() {
    return Math.random().toString(36).substr(2, 9);
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
