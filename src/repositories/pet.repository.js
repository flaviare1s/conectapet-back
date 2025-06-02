import { Pet } from "../models/pet.model.js";
import { User } from "../models/user.model.js";

export const PetRepository = {
  async create(petData) {
    return await Pet.create(petData);
  },

  async findAll() {
    return await Pet.findAll({
      include: [
        {
          model: User,
          as: "guardian",
          attributes: ["id", "nome", "email"],
        },
      ],
    });
  },

  async findById(id) {
    return await Pet.findByPk(id, {
      include: [
        {
          model: User,
          as: "guardian",
          attributes: ["id", "nome", "email"],
        },
      ],
    });
  },

  async update(id, petData) {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      throw new Error("Pet não encontrado");
    }
    return await pet.update(petData);
  },

  async delete(id) {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      throw new Error("Pet não encontrado");
    }
    await pet.destroy();
    return;
  },
};
