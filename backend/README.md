## Description

Backend da aplicação Minha Agenda, feito em NestJs.

### Links
- Documentação do NestJS: https://docs.nestjs.com/

### Installation

É necessário ter o NodeJs(>16.14) e o Yarn instalados na máquina.
Docker e Docker Compose também são necessários para rodar a aplicação.

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Por que NestJs?
- Injeção de dependência nativa.
- Produtividade.
- Modularidade. Você pode criar módulos para separar as responsabilidades da aplicação.
- Performance. Você pode livremente trocar entre Express ou Fastify através de adapters.
- Testes. Você pode criar testes unitários e de integração.
- Segurança. O NestJs possui uma série de ferramentas para ajudar a proteger sua aplicação.

### Arquitetura

A arquitetura foi baseada na arquitetura de cebola(camadas) e na arquitetura hexagonal. Também fiz com que a aplicação fosse Database Agnostic, ou seja, você pode trocar o banco de dados sem impactar o código, apenas mudando uma variável de ambiente(WHICH_DB).

A arquitetura que fiz nesse projeto é uma versão mais simples da proposta nesse post aqui: 
- https://betterprogramming.pub/clean-node-js-architecture-with-nestjs-and-typescript-34b9398d790f

#### Por que arquitetura de cebola?
- Manutenção no código é mais simples e menos custosa.
- Facilidade de testes.
- Adicionar novas funcionalidades de forma mais fácil e rápida.
- Organização do código.

#### Por que arquitetura hexagonal?
- Separação de frameworks e implementações específicas(Ex. mongo).
- Interfaces determinam a comunicação entre os módulos, facilitando uma implementação de um novo framework sem impacto no código e regras de negócios.

### Camadas

- **Controllers**: Camada responsável por receber as requisições e enviar as respostas.
- **UseCases**: Camada responsável por conter as regras de negócio da aplicação.
- **Shared**: Camada responsável por conter classes compartilhadas entre as outras camadas. Exemplo: DTOs, interfaces, abstractions, utils, etc.
- **Frameworks** - Está camada contem implementações específicas, como por exemplo o banco de dados, chamadas a APIs externas, etc.

### Autenticação

Foi utilizado a lib passport para autenticação, pois ela traz uma série de vantagens, além de ser extremamente popular para quem usa Express.
- Autenticação com JWT utilizando OpenID.
- Autenticação com providers OAuth(Google, Facebook, etc).
- Utiliza o padrão de projeto Strategy para autenticação, onde as strategies são mini-frameworks que você pode utilizar para a autenticação e autorização.

Fora essa lib, também sei utilizar os seguintes serviços de Identity Provider:
- Auth0
- FusionAuth
- Keycloak