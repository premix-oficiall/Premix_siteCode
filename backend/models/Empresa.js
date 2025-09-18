import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
  id_empresa: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  logo: { type: String },
  id_gestor: { type: String, required: true }
}, { collection: "empresas" });

export default mongoose.model("Empresa", EmpresaSchema);

