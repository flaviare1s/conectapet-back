import { User } from "../models/user.model.js";

export const UserRepository = {
  async create(userData) {
    return await User.create(userData, {
      attributes: {
        exclude: ["senha"],
      },
    });
  },

  async findAll() {
    return await User.findAll({
      attributes: {
        exclude: ["senha"],
      },
    });
  },

  async findById(id) {
    return await User.findByPk(id, {
      attributes: {
        exclude: ["senha"],
      },
    });
  },

  findByEmail: async (email) => {
    return await User.findOne({
      where: { email },
    });
  },

  async update(id, data) {
    return await User.update(data, { where: { id } });
  },

  async delete(id) {
    return await User.destroy({ where: { id } });
  },
};
