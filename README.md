# 🐾 ConectaPet - Backend

## Visão Geral

Esta aplicação representa a API do projeto ConectaPet, desenvolvida como parte da conclusão do curso **Geração Tech 2.0**. 
O backend tem como objetivo fornecer todos os recursos necessários para o funcionamento do sistema de adoção de pets, como autenticação, cadastro de usuários e gerenciamento de animais. 
O projeto foi construído com foco na organização de código, segurança básica e integração com o frontend desenvolvido pela equipe.

---

## Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express** – Framework web para construção de APIs REST.
- **MySQL** – Banco de dados relacional.
- **Sequelize** – ORM para modelagem e manipulação do banco de dados.
- **Dotenv** – Gerenciador de variáveis de ambiente.
- **Nodemon** – Reinício automático do servidor durante o desenvolvimento.
- **Jest** – Testes unitários e de integração.
- **Joi** - Validação de dados no backend.
- **Bcrypt** – Criptografia de senhas.
- **JSON Web Token** (JWT) – Autenticação baseada em tokens.
- **CORS** – Controle de acesso entre diferentes origens.
- **Nodemailer** – Envio de e-mails via SMTP.
- **Multer** – Manipulação de uploads de arquivos.

---

## Como Executar Localmente

1. Abra o Git Bash ou terminal e vá até a pasta desejada:
  ```
    cd Documents/
  ```
2.  Clone o repositório:
   ```bash
   git clone https://github.com/flaviare1s/conectapet-back.git
   ```
3. Acesse o diretório do projeto:
  ```bash
  cd conectapet-back
  ```
4. Abra o Visual Studio Code:
   ```
   code .
   ```
5. Instale as dependências:
   ```bash
   npm install
   ```
6. Copie o arquivo `.env.example` e cole na raiz do projeto e renomeie para `.env`:

7. Configure o `.env` com as variáveis adequadas (como as credenciais do banco de dados e JWT).

8. Crie o banco de dados no prompt do MySQL:
  ```
    create database conectapet_db;
  ```
9. Inicie o servidor:
   ```bash
   npm start
   ```  
10. Crie os dados falsos:
  ```
    npm run seed
  ```
---

### O banco foi hospedado no TiDB e o deploy foi feito usando Render

## Link do Deploy
🔗 https://conectapet-front.vercel.app/

## Rotas Principais

```
POST   /verify-email           - Autenticação de usuários
GET    /users                  - Listagem de usuários
POST   /request-verification   - Criação de novo usuário
GET    /pets                   - Listagem de pets cadastrados
POST   /pets                   - Cadastro de novo pet
PUT    /users/:id              - Atualização de usuário
PUT    /pets/:id               - Atualização de pet
DELETE /users/:id              - Remoção de usuário
DELETE /pets/:id               - Remoção de pet
```

---

## Diagrama do banco
![diagram](https://github.com/user-attachments/assets/049daf57-1278-4f07-9358-ff71f1253384)

### Comando para executar os testes com Jest:
```bash
npm run test
```

---

## Branchs de test:
Backend: ```tests``` e ```test/users```

---

## Conecte com o Frontend

> Para funcionamento completo da aplicação, é necessário rodar também o frontend:

🔗 Repositório do frontend: [https://github.com/flaviare1s/conectapet-front](https://github.com/flaviare1s/conectapet-front)

---

## Equipe de Desenvolvimento

- [André](https://github.com/AndreFMoura11)  
- [Caio](https://github.com/Caiovictor14)  
- [Flávia](https://github.com/flaviare1s)  
- [Lucas](https://github.com/1uc-dev)  
- [Olavo](https://github.com/olavoVieira)  
- [Palloma](https://github.com/pallomadvm)
