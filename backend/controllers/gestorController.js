import Gestor from "../models/Gestor.js";

// Controller para operações do Gestor
class GestorController {
  
  // Criar novo gestor
  static async criarGestor(req, res) {
    try {
      const { username, usuario, password } = req.body;

      // Validação dos campos obrigatórios
      if (!username || !usuario || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Todos os campos são obrigatórios: username, usuario, password" 
        });
      }

      // Verificar se o usuário já existe
      const gestorExistente = await Gestor.findOne({ usuario });
      if (gestorExistente) {
        return res.status(400).json({ 
          success: false,
          message: "Usuário já cadastrado" 
        });
      }

      // Criar novo gestor
      const novoGestor = new Gestor({ 
        username, 
        usuario, 
        password 
      });

      // Salvar no banco de dados
      const gestorSalvo = await novoGestor.save();

      console.log("✅ Gestor salvo com sucesso:", gestorSalvo);

      res.status(201).json({ 
        success: true,
        message: "Gestor cadastrado com sucesso!",
        gestorId: gestorSalvo._id.toString(),
        gestor: {
          id: gestorSalvo._id,
          username: gestorSalvo.username,
          usuario: gestorSalvo.usuario
        }
      });

    } catch (error) {
      console.error("❌ Erro ao criar gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Buscar gestor por ID
  static async buscarGestorPorId(req, res) {
    try {
      const { id } = req.params;

      const gestor = await Gestor.findById(id).select('-password');
      
      if (!gestor) {
        return res.status(404).json({ 
          success: false,
          message: "Gestor não encontrado" 
        });
      }

      res.json({ 
        success: true,
        gestor 
      });

    } catch (error) {
      console.error("❌ Erro ao buscar gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Listar todos os gestores
  static async listarGestores(req, res) {
    try {
      const gestores = await Gestor.find().select('-password');

      res.json({ 
        success: true,
        count: gestores.length,
        gestores 
      });

    } catch (error) {
      console.error("❌ Erro ao listar gestores:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Atualizar gestor
  static async atualizarGestor(req, res) {
    try {
      const { id } = req.params;
      const { username, usuario, password } = req.body;

      const gestorAtualizado = await Gestor.findByIdAndUpdate(
        id,
        { username, usuario, password },
        { new: true, runValidators: true }
      ).select('-password');

      if (!gestorAtualizado) {
        return res.status(404).json({ 
          success: false,
          message: "Gestor não encontrado" 
        });
      }

      res.json({ 
        success: true,
        message: "Gestor atualizado com sucesso!",
        gestor: gestorAtualizado 
      });

    } catch (error) {
      console.error("❌ Erro ao atualizar gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Deletar gestor
  static async deletarGestor(req, res) {
    try {
      const { id } = req.params;

      const gestorDeletado = await Gestor.findByIdAndDelete(id);

      if (!gestorDeletado) {
        return res.status(404).json({ 
          success: false,
          message: "Gestor não encontrado" 
        });
      }

      res.json({ 
        success: true,
        message: "Gestor deletado com sucesso!" 
      });

    } catch (error) {
      console.error("❌ Erro ao deletar gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Login do gestor
  static async loginGestor(req, res) {
    try {
      const { usuario, password } = req.body;

      if (!usuario || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Usuário e senha são obrigatórios" 
        });
      }

      const gestor = await Gestor.findOne({ usuario, password });
      
      if (!gestor) {
        return res.status(401).json({ 
          success: false,
          message: "Credenciais inválidas" 
        });
      }

      res.json({ 
        success: true,
        message: "Login realizado com sucesso!",
        gestor: {
          id: gestor._id,
          username: gestor.username,
          usuario: gestor.usuario
        }
      });

    } catch (error) {
      console.error("❌ Erro no login do gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }
}

export default GestorController;

