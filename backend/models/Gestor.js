import mongoose from "mongoose";

const GestorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { collection: "Gestor" }); // força a usar a coleção "Gestor"

export default mongoose.model("Gestor", GestorSchema);

