# 💀 Due or Die | To-Do List

This repository contains the solution to the technical challenge proposed by **Sootz (itnsify)**.  
The objective is to develop a **To-Do List** application with user authentication and task management, using **Firebase** as the backend and **Next.js** as the frontend.

## 📌 Features

- Authentication of users (login, registration, logout).
- Persistent sessions (user remains logged in after reloading the page).
- CRUD of tasks:
  - Create new tasks.
  - View only the tasks of the authenticated user.
  - Update (edit title, mark as completed/pending).
  - Delete tasks.
- Real-time updates (Firebase).
- Responsive design (desktop and mobile).

## 📌 Technologies

### Frontend

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)

### Backend

- [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)

### Design

- [Figma](https://www.figma.com/)
- To access the design of the project, [CLICK HERE](https://www.figma.com/design/sTIQsAjaXGZNTzLZ0arjRy/Due-or-Die-%7C-Desafio-Sootz--Itnsify?node-id=4-15&t=xs1KJ6B7jwsoNuBK-1)

## Project Structure

In the branch "main", you will find the following files and folders:

- /frontend → Next.js application
- /backend → Express + Firebase API
- README.md → general instructions
- LICENSE → MIT License

## How to run the project locally

### 1. Clone the repository

```bash
git clone https://github.com/Talyslan/due-or-die.git
cd due-or-die
```

### 2. Install dependencies

The project is configurated like a **workspace**, so the dependencies of frontend/ and backend/ will be installed automatically from the root. You can use npm or pnpm, according to your preference:

With npm:

```bash
npm install
```

With pnpm:

```bash
pnpm install
```

### 3. Configure environment variables

Create the `.env` (frontend) and `.env` (backend) files based on the `.env.example` files in each folder:

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
