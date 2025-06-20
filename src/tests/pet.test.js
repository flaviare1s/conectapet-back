import request from "supertest";
import { app } from "../app.js";
import { connection as sequelize } from "../config/database.js";
import { PendingUser } from "../models/pendingUser.model.js";
import "../models/index.js";
import { User } from "../models/user.model.js";
import { jest } from "@jest/globals";
import path from "path";

jest.setTimeout(20000);

let token;
let guardianId;
let petId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const email = "guardian@teste.com";
  const senha = "Senha123";

  const pendingRes = await request(app)
    .post("/users/request-verification")
    .send({ nome: "Guardião Teste", email, senha, role: "guardian" });
  expect([200, 201]).toContain(pendingRes.status);

  const pending = await PendingUser.findOne({ where: { email } });
  const verificationCode = pending.verificationCode;

  const verifyRes = await request(app)
    .post("/users/verify-email")
    .send({ email, verificationCode });
  expect(verifyRes.status).toBe(201);

  const loginRes = await request(app).post("/login").send({ email, senha });
  expect(loginRes.status).toBe(200);

  token = loginRes.body.accessToken;

  const user = await User.findOne({ where: { email } });
  guardianId = user.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Pet Controller", () => {
  it("Deve criar um pet com upload de imagem", async () => {
    const res = await request(app)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .field("nome", "Felix")
      .field("tipo", "cachorro")
      .field("idade", "2")
      .field("descricao", "Cachorro brincalhão")
      .field("observacoes", "")
      .field("status", "Coração livre!")
      .field("porte", "médio")
      .field("sexo", "macho")
      .field("vacinado", "sim")
      .field("castrado", "sim")
      .field("guardianId", guardianId.toString())
      .attach("imagem", path.resolve("pet-seeds-img/felix-cachorro.jpg"));

    if (res.status !== 201) {
      console.error("Erro ao criar pet:", res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Felix");
    petId = res.body.id;
  });

  it("Deve listar os pets", async () => {
    const res = await request(app).get("/pets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Deve buscar pet por ID", async () => {
    const res = await request(app).get(`/pets/${petId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(petId);
    expect(res.body.nome).toBe("Felix");
  });

  it("Deve atualizar um pet", async () => {
    const res = await request(app)
      .put(`/pets/${petId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Felix Atualizado" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Felix Atualizado");
  });

  it("Deve deletar um pet", async () => {
    const res = await request(app)
      .delete(`/pets/${petId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it("Deve retornar 404 ao deletar pet inexistente", async () => {
    const res = await request(app)
      .delete(`/pets/999999`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/Pet não encontrado/);
  });
});
