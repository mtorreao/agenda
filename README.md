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
- [X] Criar projeto frontend em Angular v9
- [X] Criar Dockerfile para o backend
- [X] Criar Dockerfile para o frontend
- [X] Criar dockercompose.yml na raiz do projeto
- [X] Adicionar MongoDB como banco de dados
- [X] Criar entitade de Contato(nome, email, telefone)
- [X] Criar repositório de Contato
- [X] Criar service de Contato
- [X] Criar controller de Contato
- [X] Adicionar serviço de autenticação
- [X] Adicionar Autenticação JWT no backend
- [X] Adicionar Autenticação JWT no frontend
- [X] Criar tela de login
- [X] Criar tela de cadastro
- [X] Criar tela de listagem de contatos
- [X] Criar tela de cadastro de contatos
- [X] Criar tela de edição de contatos
- [X] Criar tela de exclusão de contatos
- [X] Criar tela de detalhes de contatos
- [X] Arquitetura database-agnostic
- [X] Proteger rotas com autenticação
- [X] Cobertura de testes > 80%

## Requesitos

Aplicação necessita de docker e docker-compose instalados.

**Rodar o projeto**

```bash
$ docker-compose up -d
```

**Swagger**
```
http://localhost:9000/swagger
```

**Frontend**
```
http://localhost:4200
```

