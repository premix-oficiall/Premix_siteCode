import express from "express";
import UserController from "../controllers/userController.js";
import GestorController from "../controllers/gestorController.js";
import EmpresaController from "../controllers/empresaController.js";

const router = express.Router();

// Cadastro de Usuário (usando controller)
router.post("/register", UserController.criarUsuario);

// Cadastro de Gestor (usando controller)
router.post("/register-gestor", GestorController.criarGestor);

// Cadastro de Empresa (usando controller)
router.post("/register-empresa", EmpresaController.criarEmpresa);

// Login de Usuário (usando controller)
router.post("/login", UserController.loginUsuario);

// Login de Gestor
router.post("/login-gestor", GestorController.loginGestor);

export default router;
