# 💀 Due or Die | To-Do List - Desafio Sootz

Este repositório contém a solução para o desafio técnico proposto pela **Sootz (itnsify)**.  
O objetivo é desenvolver uma aplicação **To-Do List** com autenticação de usuários e gerenciamento de tarefas, utilizando **Firebase** no backend e **Next.js** no frontend.

## 📌 Funcionalidades

- Autenticação de usuários (login, cadastro, logout).
- Sessões persistentes (usuário continua logado ao recarregar a página).
- CRUD de tarefas:
    - Criar novas tarefas.
    - Visualizar apenas as tarefas do usuário autenticado.
    - Atualizar (editar título, marcar como concluída/pendente).
    - Excluir tarefas.
- Atualização em tempo real (Firebase).
- Design responsivo (desktop e mobile).

## 🛠️ Tecnologias

### Frontend

- [Next.js](https://nextjs.org/) (React + TypeScript)
- [TailwindCSS](https://tailwindcss.com/) (estilização)
- [ShadCN/UI](https://ui.shadcn.com/) (componentes UI)

### Backend

- [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/) (servidor)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (autenticação)
- [Cloud Firestore](https://firebase.google.com/docs/firestore) (armazenamento de tarefas)

### Design

- Figma
  Para acessar e visualizar o design do projeto, [CLIQUE AQUI](https://www.figma.com/design/sTIQsAjaXGZNTzLZ0arjRy/Due-or-Die-%7C-Desafio-Sootz--Itnsify?node-id=4-15&t=xs1KJ6B7jwsoNuBK-1)

## 📂 Estrutura do Projeto

Na branch "main", será possível encontrar os seguintes arquivos e pastas:

- /frontend → aplicação Next.js
- /backend → API Express + Firebase
- README.md → instruções gerais
- LICENSE → MIT License

## 💻 Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/Talyslan/due-or-die.git
cd due-or-die
```

### 2. Instalar dependências

💡 O projeto está configurado como **workspace**, então as dependências de frontend/ e backend/ serão instaladas automaticamente a partir da raiz.
Você pode usar npm ou pnpm, conforme sua preferência:

Com npm:

```bash
npm install
```

Com pnpm:

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie os arquivos `.env` (frontend) e `.env` (backend) com as variáveis de ambiente baseada nos arquivos `.env.example` em cada pasta:

### 4. Rodar a aplicação

- A aplicação frontend ficará disponível em <http://localhost:3000> (ou a porta configurada no seu .env)
- O backend rodará em <http://localhost:8080> (ou a porta configurada no seu .env)

Obtemos 3 opções de rodar a aplicação:

- Rodar a aplicação geral (frontend e backend):

```bash
npm run dev
# ou
pnpm dev
```

- Rodar o frontend:

```bash
npm run dev:frontend
# ou
pnpm dev:frontend
```

- Rodar o backend:

```bash
npm run dev:backend
# ou
pnpm dev:backend
```

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuições

Este repositório foi feito por [Talyslan Canabarro](https://github.com/Talyslan). O repositório está aberto para pull requests e opiniões!
Muito obrigado.
