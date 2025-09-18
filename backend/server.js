import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import gestorRoutes from "./routes/gestorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";

// Configuração para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o arquivo .env do diretório backend
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta raiz do projeto (premix)
app.use(express.static(path.join(__dirname, "../")));

// Conexão com MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/premix";
mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro MongoDB:", err));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/gestores", gestorRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/empresas", empresaRoutes);

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "API funcionando corretamente!",
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Rota não encontrada" 
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error("❌ Erro no servidor:", err);
  res.status(500).json({ 
    success: false, 
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 URL local: http://localhost:${PORT}`);
  console.log(`🔗 API base: http://localhost:${PORT}/api`);
});