# 📰 Projeto The News - Guia de Configuração

## ⚠️ Aviso Importante

**Este repositório inclui a pasta `node_modules` de forma intencional.** Estou ciente de que não é uma boa prática, mas foi feito propositalmente para este projeto.

---

## 🚀 Como configurar o projeto na sua máquina

### 1️⃣ Clonar o Repositório

Abra o terminal e execute o seguinte comando:

```sh
git clone <URL_DO_REPOSITORIO>
cd the-news
```

### 2️⃣ Importar o Banco de Dados no MySQL Workbench

1. Abra o **MySQL Workbench** e conecte-se ao seu servidor MySQL.
2. Crie um novo banco de dados (se necessário) com o nome `the-news`.
3. Vá em **File > Open SQL Script**, selecione o arquivo `schema.sql` fornecido e execute o script para criar as tabelas.

### 3️⃣ Configurar as Variáveis de Ambiente

Cada pasta do projeto precisa de um arquivo `.env` com as seguintes configurações:

#### 📌 Frontend (`the-news-frontend/.env`)

```sh
API_URL="http://localhost:3000" # Mantenha este valor
```

#### 📌 Backend (`the-news-backend/.env`)

```sh
BACKEND_API_PORT=3000
DATABASE_HOST="host"
DATABASE_USER="user"
DATABASE_PORT="port"
DATABASE_PASSWORD="senha"
DATABASE_NAME="the-news" # Mantenha este valor
```

#### 📌 Simulador de Usuário (`user-simulator/.env`)

```sh
WEBHOOK_URL="http://localhost:3000" # Mantenha este valor
```

### 4️⃣ Iniciar o Projeto

No diretório raiz do projeto, execute:

```sh
npm run dev
```

Isso iniciará automaticamente os três serviços (`backend`, `frontend` e `user-simulator`).

---

## 🎯 Pronto! O projeto está rodando 🚀

Agora você pode acessar a aplicação e testá-la conforme necessário. Qualquer dúvida, entre em contato!
