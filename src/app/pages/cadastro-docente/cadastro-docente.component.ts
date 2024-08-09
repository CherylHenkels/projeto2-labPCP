import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { UsuarioInterface } from '../../shared/interfaces/usuario.interface';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { MenuLateralService } from '../../shared/services/menu-lateral.service';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.css'
})
export class CadastroDocenteComponent implements OnInit{
  
  docenteForm!: FormGroup;

  isEdit = false;
  idUsuario: string | undefined;

  generos = ['','Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['','Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  materias = ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Biologia'];



  constructor(private viaCepService: ViaCepService ,
              private usuarioService: UsuariosService,
              private activatedRoute: ActivatedRoute,
              private menuLateralService: MenuLateralService
             ) { }

  ngOnInit(): void {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];

    if (this.idUsuario) {
      this.isEdit = true;
      this.usuarioService.getUsuario(this.idUsuario).subscribe((usuario) => {
        if(usuario){
        this.docenteForm.patchValue(usuario);
        }
      });
    }

    this.docenteForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      genero: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      estadoCivil: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{4}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
      materias: new FormControl([], Validators.required)
    });
  }



  buscarCep() {
    const cep = this.docenteForm.get('cep')?.value;
    if (cep) {
      this.viaCepService.buscarCep(cep).subscribe(dados => {
        if (dados) {
          this.docenteForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          });
        }
      });
    }
  }

  salvarDocente() {
    if (this.docenteForm.valid) {
      const novoDocente: UsuarioInterface = {
        ...this.docenteForm.value,
        perfil: 'Docente',  
        idade: this.calcularIdade(new Date(this.docenteForm.value.dataNascimento)),
        id:this.idUsuario ? this.idUsuario : this.gerarId()
      };
      this.usuarioService.postUsuario(novoDocente).subscribe((retorno) => {
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




// Esse funcionou

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// // import { ToastrService } from 'ngx-toastr'; // Para mostrar os alerts/toasts

// @Component({
//     selector: 'app-cadastro-docente',
//     standalone: true,
//     imports: [ReactiveFormsModule, CommonModule,],
//     templateUrl: './cadastro-docente.component.html',
//     styleUrl: './cadastro-docente.component.css'
//   })
// export class CadastroDocenteComponent implements OnInit {
//   docenteForm: FormGroup;
//   isNewDocente: boolean = true;
//   isAdmin: boolean = true; // Simulando que o usuário é um administrador
//   materias: string[] = ['Matemática', 'Português', 'História', 'Geografia'];

//   generos: string[] = ['masculino', 'feminino', 'outro'];

//   constructor(private fb: FormBuilder, private http: HttpClient
//     // , private toastr: ToastrService
//     )
//      {
//     this.docenteForm = this.fb.group({
//       nomeCompleto: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
//       genero: ['', Validators.required],
//       dataNascimento: ['', Validators.required],
//       cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]],
//       rg: ['', [Validators.required, Validators.maxLength(20)]],
//       estadoCivil: ['', Validators.required],
//       telefone: ['', [Validators.required, Validators.pattern('\\(\\d{2}\\) \\d \\d{4}-\\d{4}')]],
//       email: ['', [Validators.required, Validators.email]],
//       senha: ['', [Validators.required, Validators.minLength(8)]],
//       naturalidade: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
//       cep: ['', Validators.required],
//       cidade: ['', Validators.required],
//       estado: ['', Validators.required],
//       logradouro: ['', Validators.required],
//       numero: ['', Validators.required],
//       complemento: [''],
//       bairro: ['', Validators.required],
//       pontoReferencia: [''],
//       materias: ['', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.docenteForm.get('genero')?.valueChanges.subscribe(value => {
//       console.log('Gênero alterado:', value); // Monitorar mudanças
//     });
//   }

//   buscarEndereco() {
//     const cep = this.docenteForm.get('cep')?.value;
//     if (cep && cep.length === 8) {
//       this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
//         this.docenteForm.patchValue({
//           cidade: data.localidade,
//           estado: data.uf,
//           logradouro: data.logradouro,
//           bairro: data.bairro
//         });
//       });
//     }
//   }

//   onSubmit() {
//     if (this.docenteForm.valid) {
//       const docente = {
//         id: this.generateId(),
//         ...this.docenteForm.value
//       };
//       // Aqui você deve chamar um serviço para salvar os dados do docente
//       // this.toastr.success('Docente cadastrado com sucesso!');
//       console.log("sucesso");
//       this.isNewDocente = false;
//     } else {
//       //  this.toastr.error('Por favor, preencha todos os campos obrigatórios corretamente.');
//       console.log("erro");
//     }
//   }

//   onEdit() {
//     // Lógica para editar o docente
//   }

//   onDelete() {
//     // Lógica para deletar o docente
//   }

//   generateId() {
//     return Math.random().toString(36).substr(2, 9);
//   }
// }
