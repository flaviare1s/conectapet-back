import {Pet} from '../models/pet.model.js';
import {User} from '../models/user.model.js';
import {Adoption} from '../models/adoption.model.js';

export const AdoptionRepository = {
    async create (adoptionData) {
        return await Adoption.create(adoptionData);

    },

    async findAll(){
        return await Adoption.findAll({
            include:[
                {
                    model: Pet,
                    as: 'pet',
                    attributes:['id','nome','tipo','idade','imagem','descricao']    ,
                    include:[
                        {
                            model:User,
                            as: 'guardian',
                            attributes:['id','nome','email'],
                        }
                    ]

                }
            ]
        });
    },

    async findById(id) {
        return await Adoption.findByPk(id, {
            include: [
                {
                    model: Pet,
                    as: 'pet',
                    attributes: ['id', 'nome', 'tipo', 'idade', 'imagem', 'descricao'],
                    include: [
                        {
                            model: User,
                            as: 'guardian',
                            attributes: ['id', 'nome', 'email'],
                        }
                    ]
                }
            ]
        });
    },
    async update(id, adoptionData) {
        const adoption = await Adoption.findByPk(id);
        if (!adoption) {
            throw new Error("Adoção não encontrada");
        }
        return await adoption.update(adoptionData);
    },
    async delete(id) {
        const adoption = await Adoption.findByPk(id);
        if (!adoption) {
            throw new Error("Adoção não encontrada");
        }
        await adoption.destroy();
        return;
    }   
}