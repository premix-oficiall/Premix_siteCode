import User from "../models/User.js";

// Controller para operações do User
class UserController {
  
  // Criar novo usuário
  static async criarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Validação dos campos obrigatórios
      if (!nome || !email || !senha) {
        return res.status(400).json({ 
          success: false,
          message: "Todos os campos são obrigatórios: nome, email, senha" 
        });
      }

      // Verificar se o email já existe
      const userExistente = await User.findOne({ email });
      if (userExistente) {
        return res.status(400).json({ 
          success: false,
          message: "E-mail já cadastrado" 
        });
      }

      // Criar novo usuário
      const novoUsuario = new User({ 
        username: nome, // Mapear nome para username
        email, 
        password: senha // Mapear senha para password
      });

      // Salvar no banco de dados
      const usuarioSalvo = await novoUsuario.save();

      console.log("✅ Usuário salvo com sucesso:", usuarioSalvo);

      res.status(201).json({ 
        success: true,
        message: "Usuário cadastrado com sucesso!",
        userId: usuarioSalvo._id.toString(),
        usuario: {
          id: usuarioSalvo._id,
          username: usuarioSalvo.username,
          email: usuarioSalvo.email
        }
      });

    } catch (error) {
      console.error("❌ Erro ao criar usuário:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Login do usuário
  static async loginUsuario(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ 
          success: false,
          message: "Email e senha são obrigatórios" 
        });
      }

      const usuario = await User.findOne({ email, password: senha });
      
      if (!usuario) {
        return res.status(401).json({ 
          success: false,
          message: "Credenciais inválidas" 
        });
      }

      res.json({ 
        success: true,
        message: "Login realizado com sucesso!",
        usuario: {
          id: usuario._id,
          username: usuario.username,
          email: usuario.email
        }
      });

    } catch (error) {
      console.error("❌ Erro no login do usuário:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Buscar usuário por ID
  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await User.findById(id).select('-password');
      
      if (!usuario) {
        return res.status(404).json({ 
          success: false,
          message: "Usuário não encontrado" 
        });
      }

      res.json({ 
        success: true,
        usuario 
      });

    } catch (error) {
      console.error("❌ Erro ao buscar usuário:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Listar todos os usuários
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await User.find().select('-password');

      res.json({ 
        success: true,
        count: usuarios.length,
        usuarios 
      });

    } catch (error) {
      console.error("❌ Erro ao listar usuários:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }
}

export default UserController;

