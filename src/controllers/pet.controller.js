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
};
