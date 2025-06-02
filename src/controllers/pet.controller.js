import { PetService } from "../services/pet.service.js";

export const PetController = {
  async create(req, res) {
    try {
      const petData = {
        ...req.body,
        imagem: req.file.filename,
      };

      const pet = await PetService.createPet(petData);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(_req, res) {
    try {
      const pets = await PetService.getAllPets();

      const baseUrl = `${_req.protocol}://${_req.get("host")}`;

      const petsComUrlImagem = pets.map((pet) => ({
        ...pet.toJSON(),
        imagemUrl: pet.imagem ? `${baseUrl}/uploads/${pet.imagem}` : null,
      }));

      res.json(petsComUrlImagem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const pet = await PetService.getPetById(req.params.id);
      if (!pet) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const petComUrlImagem = {
        ...pet.toJSON(),
        imagemUrl: pet.imagem ? `${baseUrl}/uploads/${pet.imagem}` : null,
      };

      res.json(petComUrlImagem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const petData = {
        ...req.body,
      };

      if (req.file) {
        petData.imagem = req.file.filename;
      }

      const petAtualizado = await PetService.updatePet(req.params.id, petData);
      res.json(petAtualizado);
    } catch (error) {
      if (error.message === "Pet não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await PetService.deletePet(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Pet não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
};
