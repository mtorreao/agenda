## Description

Backend da aplicação Minha Agenda, feito em NestJs.

### Installation

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
- Modularidade, você pode criar módulos para separar as responsabilidades da aplicação.
- Performance. Você pode livremente trocar entre Express ou Fastify através de adapters.

### Arquitetura

A arquitetura foi baseada na arquitetura de cebola(camadas) e na arquitetura hexagonal.
mais informações sobre essas arquiteturas podem ser encontradas nos links abaixo:

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
