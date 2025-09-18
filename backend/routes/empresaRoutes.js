import express from "express";
import EmpresaController from "../controllers/empresaController.js";

const router = express.Router();

// Rota para criar nova empresa
router.post("/", EmpresaController.criarEmpresa);

// Rota para buscar empresa por ID
router.get("/:id", EmpresaController.buscarEmpresaPorId);

// Rota para buscar empresas por gestor
router.get("/gestor/:id_gestor", EmpresaController.buscarEmpresasPorGestor);

// Rota para listar todas as empresas
router.get("/", EmpresaController.listarEmpresas);

// Rota para atualizar empresa
router.put("/:id", EmpresaController.atualizarEmpresa);

// Rota para deletar empresa
router.delete("/:id", EmpresaController.deletarEmpresa);

export default router;

