import express from "express";
import GestorController from "../controllers/gestorController.js";

const router = express.Router();

// Rota para criar novo gestor
router.post("/", GestorController.criarGestor);

// Rota para login do gestor
router.post("/login", GestorController.loginGestor);

// Rota para buscar gestor por ID
router.get("/:id", GestorController.buscarGestorPorId);

// Rota para listar todos os gestores
router.get("/", GestorController.listarGestores);

// Rota para atualizar gestor
router.put("/:id", GestorController.atualizarGestor);

// Rota para deletar gestor
router.delete("/:id", GestorController.deletarGestor);

export default router;

