import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

// Rota para criar novo usuário
router.post("/", UserController.criarUsuario);

// Rota para login do usuário
router.post("/login", UserController.loginUsuario);

// Rota para buscar usuário por ID
router.get("/:id", UserController.buscarUsuarioPorId);

// Rota para listar todos os usuários
router.get("/", UserController.listarUsuarios);

export default router;

