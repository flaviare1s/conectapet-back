import { PetRepository } from "../repositories/pet.repository.js";

export const PetService = {
  createPet: async (data) => {
    return await PetRepository.create(data);
  },

  getAllPets: async () => {
    return await PetRepository.findAll();
  },
};
