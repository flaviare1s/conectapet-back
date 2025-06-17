import request from "supertest";
import { app } from "../app.js";
import { connection as sequelize } from "../config/database.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Usuário Controller", () => {
  let usuarioId;
  const nome = "Teste";
  const email = "teste@email.com";
  const senha = "Senha123";

  it("Deve criar um usuário", async () => {
    const res = await request(app).post("/users/request-verification").send({
      nome,
      email,
      senha,
      role: "user" || "guardian"
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
    usuarioId = res.body.id;
  });

  it("Deve lançar exceção para cadastro sem senha", async () => {
    const res = await request(app).post("/users/request-verification").send({
      nome,
      email,
      role: "user" || "guardian"
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"senha" is required');
  });

  it("Deve listar os usuários", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Deve buscar usuário por ID", async () => {
    const res = await request(app).get(`/users/${usuarioId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(usuarioId);
    expect(res.body.email).toBe(email);
  });

  it("Deve lançar 404 ao buscar usuário inexistente", async () => {
    const res = await request(app).get("/users/999999");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado!");
  });

  it("Deve atualizar usuário", async () => {
    const novoNome = "Teste Atualizado";
    const res = await request(app).put(`/users/${usuarioId}`).send({
      nome: novoNome,
    });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe(novoNome);
  });

  it("Deve retornar 404 ao atualizar usuário inexistente", async () => {
    const res = await request(app).put("/users/999999").send({
      nome: "Nome qualquer",
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado!");
  });

  it("Deve lançar erro ao atualizar com dados inválidos", async () => {
    const res = await request(app).put(`/users/${usuarioId}`).send({
      email: "email-invalido",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("Deve deletar usuário", async () => {
    const res = await request(app).delete(`/users/${usuarioId}`);
    expect(res.status).toBe(204);
  });

  it("Deve retornar 404 ao deletar usuário inexistente", async () => {
    const res = await request(app).delete(`/users/${usuarioId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Usuário não encontrado!");
  });
});
