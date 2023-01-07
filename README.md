# Projeto: Minha Agenda

Desenvolver um CRUD para uma agenda (nome, email e telefone) utilizando Node.js como backend e frontend em Angular v9

Requisitos:
- Regras de negócio e validações
- Utilização de padrões de projeto (repositórios, services, controllers, interfaces, injeção de dependência, etc.) dentro do contexto da aplicação
- Autenticação utilizando token JWT
- Organização e limpeza do código
- Utilização de componentes no frontend
- Cobertura de testes

Diferenciais:
- Utilização de libs e frameworks acessórios
- Dockerfile da aplicação
 
O projeto em si é bem simples, porém pode ficar à vontade para incrementar da maneira que melhor mostre suas habilidades como desenvolvedor. Pode utilizar qualquer tipo de banco de dados.

## Roadmap

- [X] Criar projeto backend em Node.js com Nest.js
- [ ] Criar projeto frontend em Angular v9
- [X] Criar Dockerfile para o backend
- [ ] Criar Dockerfile para o frontend
- [X] Criar dockercompose.yml na raiz do projeto
- [X] Adicionar MongoDB como banco de dados
- [X] Criar entitade de Contato(nome, email, telefone)
- [X] Criar repositório de Contato
- [X] Criar service de Contato
- [X] Criar controller de Contato
- [ ] Adicionar serviço de autenticação
- [ ] Adicionar Autenticação JWT no backend
- [ ] Adicionar Autenticação JWT no frontend
- [ ] Criar tela de login
- [ ] Criar tela de cadastro
- [ ] Criar tela de listagem de contatos
- [ ] Criar tela de cadastro de contatos
- [ ] Criar tela de edição de contatos
- [ ] Criar tela de exclusão de contatos
- [ ] Criar tela de detalhes de contatos

## Running the app

```bash
$ docker-compose up -d
```

Swagger
```
http://localhost:9000/swagger
```
