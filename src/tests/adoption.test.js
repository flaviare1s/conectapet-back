import request from "supertest";
import path from "path";
import { app } from "../app.js";
import { connection as sequelize } from "../config/database.js";
import { PendingUser } from "../models/pendingUser.model.js";
import "../models/index.js";
import { User } from "../models/user.model.js";
import { jest } from "@jest/globals";

jest.setTimeout(30000);

let tokenUser;
let tokenGuardian;
let userId;
let guardianId;
let petId;
let adoptionId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Criar usuário comum (role: user)
  const emailUser = "user@teste.com";
  const senhaUser = "Senha123";
  await request(app).post("/users/request-verification").send({
    nome: "Usuário Teste",
    email: emailUser,
    senha: senhaUser,
    role: "user",
  });
  const pendingUser = await PendingUser.findOne({
    where: { email: emailUser },
  });
  await request(app).post("/users/verify-email").send({
    email: emailUser,
    verificationCode: pendingUser.verificationCode,
  });
  const loginUser = await request(app).post("/login").send({
    email: emailUser,
    senha: senhaUser,
  });
  tokenUser = loginUser.body.accessToken;
  const user = await User.findOne({ where: { email: emailUser } });
  userId = user.id;

  // Criar usuário guardião (role: guardian)
  const emailGuardian = "guardian@teste.com";
  const senhaGuardian = "Senha123";
  await request(app).post("/users/request-verification").send({
    nome: "Guardião Teste",
    email: emailGuardian,
    senha: senhaGuardian,
    role: "guardian",
  });
  const pendingGuardian = await PendingUser.findOne({
    where: { email: emailGuardian },
  });
  await request(app).post("/users/verify-email").send({
    email: emailGuardian,
    verificationCode: pendingGuardian.verificationCode,
  });
  const loginGuardian = await request(app).post("/login").send({
    email: emailGuardian,
    senha: senhaGuardian,
  });
  tokenGuardian = loginGuardian.body.accessToken;
  const guardian = await User.findOne({ where: { email: emailGuardian } });
  guardianId = guardian.id;

  // Criar pet para o guardião com upload correto da imagem
  const petRes = await request(app)
    .post("/pets")
    .set("Authorization", `Bearer ${tokenGuardian}`)
    .field("nome", "Felix")
    .field("tipo", "cachorro")
    .field("idade", "3")
    .field("descricao", "Amigável")
    .field("status", "Coração livre!")
    .field("porte", "médio")
    .field("sexo", "macho")
    .field("vacinado", "sim")
    .field("castrado", "sim")
    .field("guardianId", guardianId)
    .attach("imagem", path.resolve("pet-seeds-img/felix-cachorro.jpg"));

  petId = petRes.body.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Adoption Controller", () => {
  it("Deve criar uma adoção", async () => {
    const res = await request(app)
      .post("/adoptions")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        nome: "João da Silva",
        dataN: "1990-01-01",
        cpf: "12345678900",
        ec: "solteiro",
        profissao: "Engenheiro",
        cel: "11999999999",
        cep: "01001000",
        rua: "Rua A",
        bairro: "Centro",
        numero: "100",
        cidade: "São Paulo",
        termo: true,
        custos: "sim",
        compromisso: "sim",
        visitas: "sim",
        motivacao: "Quero muito um pet para companhia",
        userId,
        petId,
      });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("João da Silva");
    adoptionId = res.body.id;
  });

  it("Não deve permitir criar adoção duplicada para mesmo usuário e pet", async () => {
    const res = await request(app)
      .post("/adoptions")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        nome: "João da Silva",
        dataN: "1990-01-01",
        cpf: "12345678900",
        ec: "solteiro",
        profissao: "Engenheiro",
        cel: "11999999999",
        cep: "01001000",
        rua: "Rua A",
        bairro: "Centro",
        numero: "100",
        cidade: "São Paulo",
        termo: true,
        custos: "sim",
        compromisso: "sim",
        visitas: "sim",
        motivacao: "Quero muito um pet para companhia",
        userId,
        petId,
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/já existe/i);
  });

  it("Deve listar todas as adoções (role guardian)", async () => {
    const res = await request(app)
      .get("/adoptions")
      .set("Authorization", `Bearer ${tokenGuardian}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Deve buscar adoção por ID (role guardian)", async () => {
    const res = await request(app)
      .get(`/adoptions/${adoptionId}`)
      .set("Authorization", `Bearer ${tokenGuardian}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(adoptionId);
  });

  it("Deve atualizar uma adoção (role guardian)", async () => {
    const res = await request(app)
      .put(`/adoptions/${adoptionId}`)
      .set("Authorization", `Bearer ${tokenGuardian}`)
      .send({
        motivacao: "Mudança na motivação para adoção",
      });
    expect(res.status).toBe(200);
    expect(res.body.motivacao).toMatch(/mudança na motivação/i);
  });

  it("Deve deletar uma adoção (role guardian)", async () => {
    const res = await request(app)
      .delete(`/adoptions/${adoptionId}`)
      .set("Authorization", `Bearer ${tokenGuardian}`);
    expect(res.status).toBe(204);
  });

  it("Deve retornar 404 ao buscar adoção inexistente", async () => {
    const res = await request(app)
      .get("/adoptions/999999")
      .set("Authorization", `Bearer ${tokenGuardian}`);
    expect(res.status).toBe(404);
  });

  it("Deve retornar 404 ao deletar adoção inexistente", async () => {
    const res = await request(app)
      .delete("/adoptions/999999")
      .set("Authorization", `Bearer ${tokenGuardian}`);
    expect(res.status).toBe(404);
  });
});
