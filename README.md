# APP Blogging Mobile

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de APP desenvolvido em React Native com Expo para um Blogging de Aulas, com sistema de cadastro e manutenção de usuários, categorias e aulas ministradas.

## Stack utilizada

## Pré-Requisitos

A utilização deste APP depende de um backend para fornecer as APIs necessárias, incluindo a lógica de negócio e a comunicação com o banco de dados.

Antes de rodar este projeto, é essencial que o backend esteja instalado e configurado corretamente.

A documentação completa sobre a instalação, configuração e execução do backend está disponível no repositório:
https://github.com/santospage/blogging-express-postech

## Instalação

Este projeto já conta com o código necessário para subir o APP em um servidor local:

```
├── .github
│   └── workflows
│       ├── pre-push.yaml
│       └── unit-tests-pr.yaml
├── src
│   ├── app
│   │   ├── category
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── category.module.css
│   │   ├── classroom
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── category.module.css
│   │   ├── components
│   │   │   ├── Categories
│   │   │   │   ├── Classes.tsx
│   │   │   │   ├── ClassRoom.tsx
│   │   │   │   └── categories.module.css
│   │   │   ├── Classes
│   │   │   │   ├── Categories.tsx
│   │   │   │   ├── Category.tsx
│   │   │   │   └── classes.module.css
│   │   ├── footer
│   │   │   ├── page.tsx
│   │   │   └── footer.module.css
│   │   ├── header
│   │   │   ├── page.tsx
│   │   │   └── header.module.css
│   │   ├── login
│   │   │   ├── page.tsx
│   │   │   └── login.module.css
│   │   ├── logout
│   │   │   ├── page.tsx
│   │   │   └── logout.module.css
│   │   ├── user
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── user.module.css
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── not-found.module.css
│   │   ├── not-found.tsx
│   │   ├── page.module.css
│   │   ├── page.tsx
│   │   ├── context
│   │   │   └── CategoryContext.tsx
│   │   ├── infra
│   │   │   └── HttpClient
│   │   │       └── HttpClient.tsx
│   │   ├── models
│   │   │   ├── Categories
│   │   │   │   └── Categories.ts
│   │   │   ├── Classes
│   │   │   │   └── Classes.ts
│   │   │   ├── Login
│   │   │   │   └── Login.ts
│   │   │   └── Users
│   │   │       └── Users.ts
│   │   ├── services
│   │   │   ├── Auth
│   │   │   │   ├── AuthService.tsx
│   │   │   │   └── TokenService.tsx
│   │   │   ├── Categories
│   │   │   │   └── CategoryService.tsx
│   │   │   ├── Classes
│   │   │   │   └── ClassRoomService.tsx
│   │   │   └── Users
│   │   │       └── UserService.tsx
├── tests
│   ├── app
│   │   ├── category
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── classroom
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── footer
│   │   │   └── page.spec.tsx
│   │   ├── header
│   │   │   └── page.spec.tsx
│   │   ├── login
│   │   │   └── page.spec.tsx
│   │   ├── logout
│   │   │   └── page.spec.tsx
│   │   ├── user
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── layout.spec.tsx
│   │   ├── not-found.spec.tsx
│   │   ├── page.spec.tsx
│   │   ├── context
│   │   │   └── CategoryContext.spec.tsx
│   │   ├── services
│   │   │   ├── Auth
│   │   │   │   └── AuthService.spec.tsx
│   │   │   ├── Categories
│   │   │   │   └── CategoryService.spec.tsx
│   │   │   ├── Classes
│   │   │   │   └── ClassRoomService.spec.tsx
│   │   │   └── Users
│   │   │       └── UserService.spec.tsx
├── .editorconfig
├── .env
├── .env_example
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Instalação do projeto

O projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto via
`npm install`.

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

- Faça o `fork` e `clone` deste repositório em seu computador;
- Entre no diretório local onde o repositório foi clonado;
- Utilize o comando `sudo docker-compose up` para "build" e subir o servidor local e expor a porta 8081 em `localhost`.

## Como rodar o APP

O comando `sudo docker-compose up` já fará o processo de instalar e subir o APP em modo de desenvolvimento.

> **IMPORTANTE:** Necessária a instalação de um emulador android para correto funcionamento, ver mais em:

Instale as dependências do projeto:
npm install

Inicialize o servidor do Expo:
npx expo start

> **IMPORTANTE:** Este APP está programado para ser acessada a partir de `http://iplocal:8081`. Certifique-se de que não existem outros recursos ocupando a porta `8081` antes de subir o projeto.

### Funcionalidades

Este APP disponibiliza as seguintes funcionalidades a partir da URL\_ `iplocal:8081/blogging`:

`/`
`Home contendo a lista de aulas disponíveis e filtros`

`/classroom`
`Exibe detalhes sobre a aula selecionada`

`/login`
`Possibilita identificação do usuário através de user e password`

`/logout`
`Desconeta o usuário identificado na opção login`

`/user/list`
`Lista todos os usuários cadastrados para utilização do sistema`

`/user/form`
`Possibilita a realização do CRUD de usuários no sistema`

`/categories/list`
`Lista todos as categorias cadastradas para classificação das aulas`

`/categories/form`
`Possibilita a realização do CRUD de categorias no sistema`

`/classes/list`
`Lista todos as aulas cadastradas no sistema`

`/classes/form`
`Possibilita a realização do CRUD de aulas no sistema`

## Observações

A lista de aulas disponíveis e seus detalhes poderão ser acessadas livremente, sem a necessidade de identificação do usuário, as demais funcionalidades exigem login de usuário cadastrado.

Usuário padrão pré-cadastrado:
`User: professor`
`Password: 123456`

## Telas
