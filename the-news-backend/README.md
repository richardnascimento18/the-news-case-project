# 🌐 Rotas do Backend - Projeto The News

Este documento descreve todas as rotas disponíveis no backend do projeto The News.

## 📋 Índice

- [Rotas de Webhook](#rotas-de-webhook)
- [Rotas de Ping](#rotas-de-ping)
- [Rotas do Dashboard do Usuário](#rotas-do-dashboard-do-usuário)
- [Rotas do Dashboard do Administrador](#rotas-do-dashboard-do-administrador)
- [Rotas de Autenticação](#rotas-de-autenticação)

## 🌐 Rotas de Webhook

### `POST /webhook`

Esta rota é utilizada para receber eventos de webhook.

## 🌐 Rotas de Ping

### `GET /ping`

Esta rota é utilizada para verificar se o servidor está ativo.

## 🌐 Rotas do Dashboard do Usuário

### `GET /user`

Esta rota retorna informações do dashboard do usuário. Requer autenticação.

## 🌐 Rotas do Dashboard do Administrador

### `GET /admin`

Esta rota retorna informações do dashboard do administrador. Requer autenticação.

## 🌐 Rotas de Autenticação

### `POST /auth/login`

Esta rota é utilizada para autenticar um usuário.

### `POST /auth/register`

Esta rota é utilizada para registrar um novo usuário.

---

## ⚙️ Middleware

As rotas `/user` e `/admin` utilizam o middleware de autenticação para garantir que apenas usuários autenticados possam acessá-las.

---

## 📌 Configuração

Certifique-se de que as variáveis de ambiente estão configuradas corretamente no arquivo `.env` conforme descrito no [guia de configuração](../../../README.md).

---

## 🚀 Iniciar o Servidor

Para iniciar o servidor, execute o seguinte comando no diretório `the-news-backend`:

```sh
npm run dev
```

## 📞 Contato

Para qualquer dúvida ou problema, entre em contato com o suporte do projeto.

Este README fornece uma visão GERAL das rotas disponíveis no backend do projeto The News, não todas.
