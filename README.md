# APP Blogging Mobile

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de APP Mobile desenvolvido em React Native com Expo para um Blogging de Aulas, com sistema de cadastro e manutenção de usuários, categorias e aulas ministradas.

## Stack utilizada

- `axios` v1.7.7
- `expo` v51.0.39
- `expo-font` v51.0.39
- `expo-status-bar` v51.0.39
- `expo-google-fonts/poppins` v0.2.3
- `jest-expo` v51.0.4
- `react` v18.2.0
- `react-native` v0.74.5
- `react-native-dotenv` v3.4.11
- `react-native-gesture-handler` v2.16.1
- `react-native-modal` v13.0.1
- `react-native-reanimated` v3.10.1
- `react-native-safe-area-context` v4.10.5
- `react-native-screens` v3.31.1
- `react-native-toast-message` v2.2.1
- `react-native-async-storage/async-storage` v1.23.1
- `react-native-picker/picker` v2.7.5
- `react-navigation` v5.0.0
- `react-navigation/bottom-tabs` v7.0.0
- `react-navigation/drawer` v7.0.1
- `react-navigation/native` v7.0.0
- `react-navigation/stack` v7.0.0
- `rxjs` v7.8.1
- `styled-components` v6.1.13

## Pré-Requisitos

A utilização deste APP depende de um backend para fornecer as APIs necessárias, incluindo a lógica de negócio e a comunicação com o banco de dados.

Antes de rodar este projeto, é essencial que o backend esteja instalado e configurado corretamente.

A documentação completa sobre a instalação, configuração e execução do backend está disponível no repositório:
https://github.com/santospage/blogging-express-postech

> **IMPORTANTE:** Para garantir o funcionamento correto, é necessário instalar um emulador de dispositivo móvel, para mais informaçoes, procure por `Usando o Emulador` em:
> https://www.alura.com.br/artigos/configurando-o-ambiente-react-native

## Instalação

Este projeto já conta com o código necessário para subir o APP em um servidor local:

```
├── assets
├── .github
│   └── workflows
│       ├── pre-push.yaml
│       └── unit-tests-pr.yaml
├── src
│   ├── contexts
│   │   └── AuthenticatorContext.tsx
│   ├── interfaces
│   │   ├── Authentication
│   │   │   └── Authentication.ts
│   │   ├── BasePage
│   │   │   └── BasePage.ts
│   │   ├── Category
│   │   │   └── Category.ts
│   │   ├── Classes
│   │   │   ├── Classes.ts
│   │   ├── Home
│   │   │   └── Home.ts
│   │   ├── Login
│   │   │   └── Login.ts
│   │   ├── User
│   │   │   └── User.ts
│   ├── pages
│   │   ├── BasePage
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Category
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   └── Form
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   │   ├── Classes
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   └── Card
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   │   ├── ClassRoom
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   ├── Form
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   └── List
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   │   ├── Home
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Login
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Logout
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── User
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   └── Form
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   ├── routes
│   │   └── navigation.tsx
│   ├── services
│   │   ├── Auth
│   │   │   ├── AuthService.ts
│   │   │   └── TokenService.ts
│   │   ├── Category
│   │   │       └── CategoryService.ts
│   │   ├── Classes
│   │   │       └── ClassRoomService.ts
│   │   ├── User
│   │   │       └── UserService.ts
│   │   └── api.ts
│   └── react-native-dotenv.d.ts
├── .editorconfig
├── .env
├── .env_example
├── .gitignore
├── .prettierrc
├── .prettierrc.js
├── app.json
├── App.tsx
├── babel.config.js
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── __tests__
│   ├── contexts
│   │   └── AuthenticatorContext.spec.tsx
│   ├── pages
│   │   ├── Category
│   │   │   ├── Form
│   │   │   │   └── index.spec.tsx
│   │   │   └── index.spec.tsx
│   │   ├── Classes
│   │   │   ├── Form
│   │   │   │   └── index.spec.tsx
│   │   │   └── index.spec.tsx
│   │   ├── ClassRoom
│   │   │   ├── Form
│   │   │   │   └── index.spec.tsx
│   │   │   ├── List
│   │   │   │   └── index.spec.tsx
│   │   │   └── index.spec.tsx
│   │   ├── Home
│   │   │   └── index.spec.tsx
│   │   ├── Login
│   │   │   └── index.spec.tsx
│   │   ├── Logout
│   │   │   └── index.spec.tsx
│   │   └── User
│   │       ├── Form
│   │       │   └── index.spec.tsx
│   │       └── index.spec.tsx
│   ├── routes
│   │       └── navigation.spec.tsx
│   └── services
│       ├── Auth
│       │   ├── AuthService.spec.ts
│       │   └── TokenService.spec.ts
│       ├── Category
│       │   └── CategoryService.spec.ts
│       ├── Classes
│       │   └── ClassRoomService.spec.ts
│       └── User
│           └── UserService.spec.ts
└──── app.spec.tsx
```

### Execução do projeto

O projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto via
`npm install`.

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

- Faça o `fork` e `clone` deste repositório em seu computador;
- Entre no diretório local onde o repositório foi clonado;
- Utilize o comando `sudo docker-compose up` para "build" e subir o servidor local e expor a porta 8081 em `iplocal`.

## Como rodar o APP

O comando `sudo docker-compose up` já fará o processo de subir o APP e instalar as dependências em modo de desenvolvimento.

Inicialize o servidor com o comando `npx expo start`, após, pressione a tecla `a` para abrir o emulador.

> **IMPORTANTE:** Estes comandos também inicializarão o emulador, aguarde a finalização do processo.

> **IMPORTANTE:** Este APP está programado para ser acessada a partir de `http://iplocal:8081`. Certifique-se de que não existem outros recursos ocupando a porta `8081` antes de subir o projeto.

### Funcionalidades

Este APP disponibiliza as seguintes funcionalidades a partir da URL\_ `iplocal:8081/blogging`:

`/`
`Home contendo a opção de login e aulas disponíveis`

`/Classes`
`Exibe detalhes sobre a aula selecionada`

`/Login`
`Possibilita identificação do usuário através de user e password`

`/Logout`
`Desconeta o usuário identificado na opção login`

`/User/List`
`Lista todos os usuários cadastrados para utilização do sistema`

`/User/Form`
`Possibilita a realização do CRUD de usuários no sistema`

`/Categories/List`
`Lista todos as categorias cadastradas para classificação das aulas`

`/Categories/Form`
`Possibilita a realização do CRUD de categorias no sistema`

`/Classes/List`
`Lista todos as aulas cadastradas no sistema`

`/Classes/Form`
`Possibilita a realização do CRUD de aulas no sistema`

## Observações

A lista de aulas disponíveis e seus detalhes poderão ser acessadas livremente, sem a necessidade de identificação do usuário, as demais funcionalidades exigem login de usuário cadastrado.

Usuário padrão pré-cadastrado:
`User: professor`
`Password: 123456`

## Telas

![Welcome](https://drive.google.com/uc?export=view&id=1REmNr0Y3khBczXUpbYHeCRBAPnHEP4Ny)

![Login](https://drive.google.com/uc?export=view&id=1BJSaEEAzNj1-EQk6mrTCJR2N7BPIcgfJ)

![Classes](https://drive.google.com/uc?export=view&id=1OlgMODMHm0alLpukVB7F6acCGcWt0ZTp)

![Card](https://drive.google.com/uc?export=view&id=1xHroamMAhuvhvt3DeS8hKAAC94R-EiDG)

![List](https://drive.google.com/uc?export=view&id=1b0HZm10ZOzVG2PwHnAF_xgaAcRTmDsPZ)

![Form](https://drive.google.com/uc?export=view&id=1VC5cozSFDp5epjbfgpmh4SKTYvJ03idL)
