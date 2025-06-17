import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";
import { connection } from "../config/database.js";
import { Adoption } from "../models/adoption.model.js";

export async function adoptionSeeds() {
  try {
    const users = await User.findAll();
    const pets = await Pet.findAll();

    if (users.length === 0 || pets.length === 0) {
      console.log(
        "Usuários ou pets não encontrados. Cadastre-os antes de rodar o seed de adoção."
      );
      await connection.close();
      return;
    }

    const adoptionData = [
      {
        nome: "Maria da Silva",
        dataN: "1990-05-20",
        cpf: "123.456.789-00",
        ec: "solteiro",
        profissao: "Professora",
        cel: "(11) 91234-5678",
        cep: "12345-678",
        rua: "Rua das Flores",
        bairro: "Centro",
        numero: "123",
        cidade: "São Paulo",
        termo: true,
        custos: "sim",
        compromisso: "sim",
        visitas: "sim",
        motivacao: "Quero adotar um pet para fazer companhia em casa.",
        favoritado: false,
        userId: 1,
        petId: 1,
      },
      {
        nome: "João Pereira",
        dataN: "1985-08-12",
        cpf: "987.654.321-00",
        ec: "casado",
        profissao: "Engenheiro",
        cel: "(21) 99876-5432",
        cep: "54321-000",
        rua: "Avenida Brasil",
        bairro: "Jardim",
        numero: "456",
        cidade: "Rio de Janeiro",
        termo: true,
        custos: "sim",
        compromisso: "sim",
        visitas: "não",
        motivacao: "Quero um pet para meus filhos.",
        favoritado: false,
        userId: 3,
        petId: 1,
      },
      {
        nome: "Ana Souza",
        dataN: "1995-11-30",
        cpf: "321.654.987-00",
        ec: "solteiro",
        profissao: "Designer",
        cel: "(31) 98765-4321",
        cep: "67890-123",
        rua: "Rua das Palmeiras",
        bairro: "Bela Vista",
        numero: "789",
        cidade: "Belo Horizonte",
        termo: true,
        custos: "não",
        compromisso: "sim",
        visitas: "sim",
        motivacao: "Sempre quis adotar um animal.",
        favoritado: false,
        userId: 3,
        petId: 3,
      },
      {
        nome: "Carlos Lima",
        dataN: "1978-03-22",
        cpf: "456.789.123-00",
        ec: "divorciado",
        profissao: "Médico",
        cel: "(41) 91234-8765",
        cep: "13579-246",
        rua: "Rua Central",
        bairro: "Centro",
        numero: "321",
        cidade: "Curitiba",
        termo: true,
        custos: "sim",
        compromisso: "não",
        visitas: "sim",
        motivacao: "Quero companhia para minha casa.",
        favoritado: false,
        userId: 1,
        petId: 4,
      },
      {
        nome: "Beatriz Ramos",
        dataN: "2000-07-15",
        cpf: "654.321.987-00",
        ec: "solteiro",
        profissao: "Estudante",
        cel: "(51) 92345-6789",
        cep: "24680-135",
        rua: "Rua Nova",
        bairro: "Vila Nova",
        numero: "654",
        cidade: "Porto Alegre",
        termo: true,
        custos: "não",
        compromisso: "sim",
        visitas: "não",
        motivacao: "Quero um pet para me ajudar com a ansiedade.",
        favoritado: false,
        userId: 1,
        petId: 5,
      },
    ];

    await Adoption.bulkCreate(adoptionData);
    console.log("Dados de adoção inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir dados de adoção:", error);
  } finally {
    await connection.close();
  }
}
