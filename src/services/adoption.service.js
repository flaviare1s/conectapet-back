import { AdoptionRepository } from "../repositories/adoption.repository.js";
import bcrypt from "bcrypt"


export const AdoptionService = {
  createAdoption: async (data) => {
    
    const allAdoptions = await AdoptionRepository.findAll();
    const alreadyExists = allAdoptions.some(
      (adoption) => adoption.userId === data.userId && adoption.petId === data.petId
    );
    if (alreadyExists) {
      const error = new Error("Já existe uma solicitação de adoção para este usuário e pet.");
      error.statusCode = 400;
      throw error;
    }

    
    if (!data.nome || !data.cpf || !data.userId || !data.petId) {
      const error = new Error("Campos obrigatórios não preenchidos.");
      error.statusCode = 400;
      throw error;
    }

   

    return await AdoptionRepository.create(data);
  },

  getAllAdoptions: async () => {
    return await AdoptionRepository.findAll();
  },

  getAdoptionById: async (id) => {
    const adoption = await AdoptionRepository.findById(id);
    if (!adoption) {
      const error = new Error("Adoção não encontrada.");
      error.statusCode = 404;
      throw error;
    }
    return adoption;
  },

  updateAdoption: async (id, data) => {
   
    return await AdoptionRepository.update(id, data);
  },

  deleteAdoption: async (id) => {
   
    return await AdoptionRepository.delete(id);
  },
};
