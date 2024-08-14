# Projeto módulo 2 - labPCP

## Aluna
Cheryl Henkels

## Descrição
Sistema de controle de uma instituição de ensino que permite a gestão de cursos, turmas, matérias, notas, alunos e docentes. Ela pode ser implementada em creches, escolas, universidades, ou qualquer entidade de ensino para gerir seu sistema organizacional.
O repositório atual constitui a parte Front-End do software, o qual é feito com o framework Angular.
A aplicação foi feita em html, css e javascript.



## Execução 

O sistema baseia-se na utilização de diferentes papéis de usuário para restringir o acesso às diferentes páginas do sistema. Assim, no momento do login é necessário fornecer email e senha.

Para testar as funcionalidades das páginas, foi criado um mock inicial com várias informações relevantes, dentre elas as de usuário. Foi criado cinco usuários iniciais distribuídos nos três perfis existentes no sistema.

**Administrador**
* email: "adm@school.com",
  senha: "pass1",

**Docente**
* email: "docente@school.com",
  senha: "pass2",
* email: "docente2@school.com",
  senha: "pass2",

**Aluno**
* email: "aluno@school.com",
  senha: "pass3",
* email: "aluno2@school.com",
  senha: "pass3",


Essas informações estão salvas no arquivo 'usuarios.json'. Por isso, para a aplicação funcionar é necessário rodar o json server


```json-server --watch src/db/usuarios.json --port 3000~```


Também é necessário iniciar o servidor da aplicação


```json-server --watch src/db/usuarios.json --port 3000~```


E entrar no endereço informado. No meu caso é: http://localhost:4200/

## Funcionalidades

### Administradores
- **Cadastro de Docente:** Permite o cadastro de novos docentes, com validação de dados e busca de endereço por CEP.
- **Cadastro de Aluno:** Permite o cadastro de novos alunos, com validação de dados e busca de endereço por CEP.
- **Cadastro de Turma:** Permite criação de turmas.
- **Cadastro de Nota:** Permite o cadastro de notas para alunos.
- **Listagem de Docentes:** Exibe todos os docentes cadastrados, com uma barra de busca para facilitar a pesquisa. Possui funcionalidade de "Ver Mais" para edição e deleção de docentes.


### Docentes
- **Cadastro de Turma:** Permite criação de turmas para lecionar.
- **Cadastro de Nota:** Permite o cadastro de notas para os alunos que cursam suas aulas.

### Alunos
- **Notas:** Exibe o histórico de notas do aluno, categorizado por matéria e em ordem cronológica.



## Melhorias
- O aluno poderia ter acesso a sua média por matéria para acompanhar seu progresso
- Poderia ser acrescentado um status final se o aluno foi APROVADO ou REPROVADO
- O aluno poderia ter acesso às informações das matérias na qual ele está matriculado


## Informações finais
Este projeto foi desenvolvido para o curso FullStack [Education] para compor a nota do módulo.

O projeto está todo contido no repositório do gitHub: <https://github.com/CherylHenkels/projeto2-labPCP.git>

A organização das tarefas foi feita no Trello e pode ser conferida no quadro (board):
<https://trello.com/invite/b/66a63950cd05b6e37f6c7621/ATTI1dfb6eccfb70516819146d625f81b72f41CF5D7F/projeto-modulo-2>

O video explicando a aplicação pode ser encontrado em:
<https://drive.google.com/drive/folders/1pStRNvAemlv-NfigR1FLaKHpwfxveMDD?usp=sharing>
