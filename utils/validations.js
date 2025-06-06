import Joi from "joi";

export const userValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    role: Joi.string().valid("guardian", "user").required(),
    emailVerificado: Joi.boolean().default(false)
})

export const userUpdateValidation = Joi.object({
    nome: Joi.string().max(150),
    email: Joi.string().email(),
    senha: Joi.string().min(6),
    role: Joi.string().valid("guardian", "user"),
    emailVerificado: Joi.boolean().default(false)
})

export const petValidation = Joi.object({
    tipo: Joi.string().valid('cachorro', 'gato').required(),
    nome: Joi.string().max(50).required(),
    idade: Joi.string().max(20).required(),
    imagem: Joi.string().required(),
    descricao: Joi.string().required(),
    observacoes: Joi.string().optional(),
    status: Joi.string().valid("Coração livre!", "Quase lá!", "Final feliz!").required(),
    porte: Joi.string().valid("pequeno", "médio", "grande").required(),
    sexo: Joi.string().valid('macho', 'fêmea').required(),
    vacinado: Joi.string().valid('sim', 'não').required(),
    castrado: Joi.string().valid('sim', 'não').required()
})

export const petUpdateValidation = Joi.object({
    tipo: Joi.string().valid('cachorro', 'gato'),
    nome: Joi.string().max(50),
    idade: Joi.string().max(20),
    imagem: Joi.string(),
    descricao: Joi.string(),
    observacoes: Joi.string().optional(),
    status: Joi.string().valid("Coração livre!", "Quase lá!", "Final feliz!"),
    porte: Joi.string().valid("pequeno", "médio", "grande"),
    sexo: Joi.string().valid('macho', 'fêmea'),
    vacinado: Joi.string().valid('sim', 'não'),
    castrado: Joi.string().valid('sim', 'não')
})

export const adoptionValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    dataN: Joi.date().iso().less('now').required(),
    cpf: Joi.string().pattern(/^\d{11}$/).required(),
    ec: Joi.string().valid('solteiro', 'casado', 'divorciado', 'viuvo').required(),
    profissao: Joi.string().optional(),
    cel: Joi.string().pattern(/^\d{10,11}$/).required(),
    cep: Joi.string().pattern(/^\d{8}$/).required(),
    rua: Joi.string().max(200).required(),
    bairro: Joi.string().required(),
    numero: Joi.string().required(),
    cidade: Joi.string().required(),
    termo: Joi.boolean().valid(true).required(),
    custos: Joi.string().valid('sim', 'não').required(),
    compromisso: Joi.string().valid('sim', 'não').required(),
    visitas: Joi.string().valid('sim', 'não').required(),
    motivacao: Joi.string().optional(),
    favoritado: Joi.boolean().default(false),
    userId: Joi.number().required(),
    petId: Joi.number().required(),
})

export const adoptUpdateValidation = Joi.object({
    nome: Joi.string().max(150),
    dataN: Joi.date().iso().less('now'),
    cpf: Joi.string().pattern(/^\d{11}$/),
    ec: Joi.string().valid('solteiro', 'casado', 'divorciado', 'viuvo'),
    profissao: Joi.string().optional(),
    cel: Joi.string().pattern(/^\d{10,11}$/),
    cep: Joi.string().pattern(/^\d{8}$/),
    rua: Joi.string().max(200),
    bairro: Joi.string(),
    numero: Joi.string(),
    cidade: Joi.string(),
    termo: Joi.boolean().valid(true),
    custos: Joi.string().valid('sim', 'não'),
    compromisso: Joi.string().valid('sim', 'não'),
    visitas: Joi.string().valid('sim', 'não'),
    motivacao: Joi.string().optional(),
    favoritado: Joi.boolean().optional().default(false),
    userId: Joi.number().optional(),
    petId: Joi.number().optional(),
})
