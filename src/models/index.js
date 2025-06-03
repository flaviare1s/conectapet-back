import { User } from "./user.model.js";
import { Pet } from "./pet.model.js";
import { Adoption } from "./adoption.model.js";

User.hasMany(Pet, { foreignKey: "guardianId", as: "pets" });
Pet.belongsTo(User, { foreignKey: "guardianId", as: "guardian" });

User.hasMany(Adoption, { foreignKey: "userId", as: "adoptions" });
Adoption.belongsTo(User, { foreignKey: "userId", as: "adopter" });

Pet.hasMany(Adoption, { foreignKey: "petId", as: "adopters" });
Adoption.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

export { User, Pet, Adoption };
