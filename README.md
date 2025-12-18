# 🐾 ConectaPet - Backend

[![pt-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

## 📋 Visão Geral

O **ConectaPet** é uma API RESTful desenvolvida como projeto de conclusão do curso **Geração Tech 2.0**. Esta aplicação fornece toda a infraestrutura backend necessária para um sistema completo de adoção de animais de estimação, incluindo:

- 🔐 Sistema de autenticação e autorização com JWT
- 👥 Gerenciamento completo de usuários (guardiões e adotantes)
- 🐕 Cadastro e gerenciamento de pets disponíveis para adoção
- 📝 Controle do processo de adoção
- 📧 Envio de e-mails de verificação e notificações
- 📸 Upload e gerenciamento de imagens
- 📚 Documentação interativa com Swagger

O projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento, com foco em arquitetura limpa, segurança e integração com o frontend.

---

## 🚀 Tecnologias Utilizadas

### Core

- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web para construção de APIs REST
- **MySQL** – Banco de dados relacional
- **Sequelize** – ORM para modelagem e manipulação do banco de dados

### Segurança e Autenticação

- **Bcrypt** – Criptografia de senhas
- **JSON Web Token (JWT)** – Autenticação baseada em tokens
- **CORS** – Controle de acesso entre diferentes origens
- **Joi** – Validação de dados no backend

### Funcionalidades

- **Multer** – Manipulação de uploads de arquivos
- **Nodemailer** – Envio de e-mails via SMTP

### Desenvolvimento e Documentação

- **Dotenv** – Gerenciamento de variáveis de ambiente
- **Nodemon** – Reinício automático do servidor durante o desenvolvimento
- **Jest** – Testes unitários e de integração
- **Swagger JS Docs e UI Express** – Documentação interativa da API

---

## 📦 Como Executar Localmente

### Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- Git

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/flaviare1s/conectapet-back.git
   cd conectapet-back
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   - Copie o arquivo `.env.example` para `.env`
   - Configure as seguintes variáveis:
     ```env
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=conectapet_db
     JWT_SECRET=sua_chave_secreta
     EMAIL_USER=seu_email@gmail.com
     EMAIL_PASS=sua_senha_email
     ```

4. **Crie o banco de dados**

   ```sql
   CREATE DATABASE conectapet_db;
   ```

5. **Inicie o servidor**

   ```bash
   npm start
   ```

6. **Popular o banco com dados de exemplo (opcional)**

   ```bash
   npm run seed
   ```

7. **Acesse a documentação Swagger**
   ```bash
   npm run swagger
   ```
   Abra o navegador em: `http://localhost:3000/api-docs`

---

## 🧪 Testes

Execute os testes unitários e de integração com Jest:

```bash
npm run test
```

Branch de testes: `tests`

---

## 🌐 Deploy

- **Frontend**: Hospedado na Vercel
- **Backend**: Hospedado no Render
- **Banco de Dados**: TiDB Cloud

**🔗 Aplicação em Produção**: [https://conectapet-front.vercel.app/](https://conectapet-front.vercel.app/)

---

## 📡 Rotas da API

### Autenticação

```
POST   /request-verification   - Solicitar verificação de e-mail para novo usuário
POST   /verify-email           - Verificar e-mail e criar conta
POST   /auth                   - Login do usuário
POST   /auth/refresh-token     - Renovar token JWT
```

### Usuários

```
GET    /users                  - Listar todos os usuários
GET    /users/:id              - Buscar usuário por ID
PUT    /users/:id              - Atualizar dados do usuário
DELETE /users/:id              - Remover usuário
```

### Pets

```
POST   /pets                   - Cadastrar novo pet
GET    /pets                   - Listar todos os pets
GET    /pets/:id               - Buscar pet por ID
PUT    /pets/:id               - Atualizar dados do pet
DELETE /pets/:id               - Remover pet
```

### Adoções

```
POST   /adoptions              - Solicitar adoção de pet
GET    /adoptions              - Listar solicitações de adoção (guardião)
GET    /adoptions/:id          - Buscar solicitação por ID
PUT    /adoptions/:id          - Atualizar status da adoção (guardião)
DELETE /adoptions/:id          - Cancelar solicitação de adoção
```

Para detalhes completos dos endpoints, acesse a documentação Swagger em `/api-docs`

---

## 🗄️ Diagrama do Banco de Dados

![Database Diagram](https://github.com/user-attachments/assets/049daf57-1278-4f07-9358-ff71f1253384)

---

## 🔗 Integração com o Frontend

Para o funcionamento completo da aplicação, é necessário executar também o frontend:

**Repositório do Frontend**: [conectapet-front](https://github.com/flaviare1s/conectapet-front)

> ⚠️ **Nota**: A porta padrão esperada para o backend é a **3000**.

---

## 📂 Estrutura do Projeto

```
conectapet-back/
├── src/
│   ├── config/           # Configurações (banco de dados, etc)
│   ├── controllers/      # Controladores das rotas
│   ├── middlewares/      # Middlewares (autenticação, erros, etc)
│   ├── models/           # Modelos do Sequelize
│   ├── repositories/     # Camada de acesso a dados
│   ├── routes/           # Definição das rotas
│   ├── seeders/          # Seeds para popular o banco
│   ├── services/         # Lógica de negócio
│   └── utils/            # Funções utilitárias
├── uploads/              # Arquivos enviados (imagens)
├── .env.example          # Exemplo de variáveis de ambiente
└── package.json          # Dependências do projeto
```

---

## 👥 Equipe de Desenvolvimento

| Desenvolvedor | GitHub                                             |
| ------------- | -------------------------------------------------- |
| André         | [@AndreFMoura11](https://github.com/AndreFMoura11) |
| Flávia        | [@flaviare1s](https://github.com/flaviare1s)       |
| Lucas         | [@1uc-dev](https://github.com/1uc-dev)             |
| Olavo         | [@olavoVieira](https://github.com/olavoVieira)     |
| Palloma       | [@pallomadvm](https://github.com/pallomadvm)       |

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso Geração Tech 2.0.

---

<div align="center">
  Desenvolvido pela equipe ConectaPet
</div>
