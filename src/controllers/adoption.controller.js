import { adoptionValidation, adoptUpdateValidation } from "../../utils/validations.js";
import { AdoptionService } from "../services/adoption.service.js";

export const AdoptionController = {
  async create(req, res) {
    const { error } = adoptionValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    try {
      const adoption = await AdoptionService.createAdoption(req.body);
      res.status(201).json(adoption);
    } catch (error) {
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
  try {
    const { petId } = req.query;

    let adoptions;
    if (petId) {
      adoptions = await AdoptionService.getAdoptionsByPetId(petId);
    } else {
      adoptions = await AdoptionService.getAllAdoptions();
    }

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

  async getById(req, res) {
    try {
      const adoption = await AdoptionService.getAdoptionById(req.params.id);
      if (!adoption) {
        return res.status(404).json({ error: "Adoção não encontrada" });
      }
      res.json(adoption);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  async update(req, res) {
    const { error } = adoptUpdateValidation.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    try {
      const adoption = await AdoptionService.updateAdoption(
        req.params.id,
        req.body
      );
      res.json(adoption);
    } catch (error) {
      if (
        error.message === "Adoção não encontrada" ||
        error.statusCode === 404
      ) {
        return res.status(404).json({ message: error.message });
      }
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await AdoptionService.deleteAdoption(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (
        error.message === "Adoção não encontrada" ||
        error.statusCode === 404
      ) {
        return res.status(404).json({ message: error.message });
      }
      res.status(error.statusCode || 400).json({ message: error.message });
    }
  },
};
