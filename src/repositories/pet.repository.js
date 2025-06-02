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
};
