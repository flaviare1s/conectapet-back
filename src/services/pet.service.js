import { PetRepository } from "../repositories/pet.repository.js";

export const PetService = {
  createPet: async (data) => {
    return await PetRepository.create(data);
  },

  getAllPets: async () => {
    return await PetRepository.findAll();
  },

  getPetById: async (id) => {
    return await PetRepository.findById(id);
  },

  updatePet: async (id, data) => {
    return await PetRepository.update(id, data);
  },

  deletePet: async (id) => {
    return await PetRepository.delete(id);
  },
};
