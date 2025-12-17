# 🚀 ORM Project

Projeto exemplo utilizando **Express**, **TypeScript** e **Prisma ORM** com **PostgreSQL**.
Este repositório demonstra uma estrutura simples e organizada para APIs REST usando boas práticas com Prisma e Node.js.

---

## 🧰 Tecnologias

* **Node.js**
* **Express**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **Docker (docker-compose)**

---

## 📋 Requisitos

Antes de começar, certifique-se de ter instalado:

* **Node.js** >= 16
* **npm** (ou `pnpm` / `yarn`)
* **PostgreSQL** rodando localmente ou uma URL de conexão válida

---

## ⚙️ Configuração rápida

### 1️⃣ Clonar o repositório

```bash
git clone <repo-url>
cd orm_project
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
# Linux / macOS
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env
```

Edite o arquivo `.env` e ajuste os valores de **usuário**, **senha**, **host**, **porta** e **nome do banco** conforme seu ambiente.

---

## 🧬 Prisma

### Gerar o Prisma Client

> Obrigatório sempre que o arquivo `schema.prisma` for alterado.

```bash
npx prisma generate
```

### Aplicar migrations

```bash
# Ambiente de desenvolvimento (interativo)
npx prisma migrate dev

# Ambiente de deploy (migrations já existentes)
npx prisma migrate deploy
```

### Prisma Studio

Para visualizar e inspecionar os dados do banco:

```bash
npx prisma studio
```

---

## ▶️ Rodando a aplicação

### Modo desenvolvimento

```bash
npm run dev
```

A API irá iniciar na porta definida na variável `PORT` do arquivo `.env` (ex.: `3000`).

### Endpoints disponíveis

* **POST** `/authors` — Cria um autor
  Implementação: `src/controllers/author_controller.ts`

---

## 📁 Estrutura do projeto

```text
ORM_PROJECT
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── migration_lock.toml
├── src
│   ├── controllers
│   │   └── author_controller.ts
│   ├── index.ts
│   ├── prisma.ts
│   └── routes.ts
├── .env.example
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📝 Notas e dicas

* Caso o **VS Code** apresente erros no `schema.prisma`, verifique se a extensão do Prisma está usando a versão do projeto:

```json
"prisma.useWorkspaceVersion": true
```

(Essa configuração já pode ser encontrada em `.vscode/settings.json`.)

* Se o **Prisma Studio** abrir com erro no navegador, verifique a saída completa do terminal após executar `npx prisma studio`.

---

## 🧾 Comentários no código

Alguns arquivos essenciais (`src/index.ts`, `src/routes.ts`, `src/prisma.ts`, `src/controllers/author_controller.ts`)
contêm comentários explicativos para ajudar novos desenvolvedores a entenderem decisões importantes
como o uso de uma única instância do `PrismaClient`, o mapeamento de campos (`country` ↔ `pais`) e
como as rotas são registradas. Leia os comentários inline para orientação rápida.

---

## 📌 Arquivos importantes

* [`src/index.ts`](src/index.ts) — Ponto de entrada da aplicação
* [`src/routes.ts`](src/routes.ts) — Definição das rotas
* [`src/controllers/author_controller.ts`](src/controllers/author_controller.ts) — Controller de autores
* [`prisma/schema.prisma`](prisma/schema.prisma) — Schema do Prisma

---

✨ Projeto simples, focado em clareza, organização e boas práticas com Prisma + TypeScript.
