import Empresa from "../models/Empresa.js";

// Controller para operações da Empresa
class EmpresaController {
  
  // Criar nova empresa
  static async criarEmpresa(req, res) {
    try {
      const { id_empresa, nome, cnpj, senha, logo, id_gestor } = req.body;

      // Validação dos campos obrigatórios
      if (!nome || !cnpj || !senha || !id_gestor) {
        return res.status(400).json({ 
          success: false,
          message: "Campos obrigatórios: nome, cnpj, senha, id_gestor" 
        });
      }

      // Verificar se o CNPJ já existe
      const empresaExistente = await Empresa.findOne({ cnpj });
      if (empresaExistente) {
        return res.status(400).json({ 
          success: false,
          message: "CNPJ já cadastrado" 
        });
      }

      // Criar nova empresa
      const novaEmpresa = new Empresa({ 
        id_empresa, 
        nome, 
        cnpj, 
        senha, 
        logo, 
        id_gestor 
      });

      // Salvar no banco de dados
      const empresaSalva = await novaEmpresa.save();

      console.log("✅ Empresa salva com sucesso:", empresaSalva);

      res.status(201).json({ 
        success: true,
        message: "Empresa cadastrada com sucesso!",
        empresaId: empresaSalva._id.toString(),
        empresa: {
          id: empresaSalva._id,
          id_empresa: empresaSalva.id_empresa,
          nome: empresaSalva.nome,
          cnpj: empresaSalva.cnpj,
          logo: empresaSalva.logo,
          id_gestor: empresaSalva.id_gestor
        }
      });

    } catch (error) {
      console.error("❌ Erro ao criar empresa:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Buscar empresa por ID
  static async buscarEmpresaPorId(req, res) {
    try {
      const { id } = req.params;

      const empresa = await Empresa.findById(id).select('-senha');
      
      if (!empresa) {
        return res.status(404).json({ 
          success: false,
          message: "Empresa não encontrada" 
        });
      }

      res.json({ 
        success: true,
        empresa 
      });

    } catch (error) {
      console.error("❌ Erro ao buscar empresa:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Buscar empresas por gestor
  static async buscarEmpresasPorGestor(req, res) {
    try {
      const { id_gestor } = req.params;

      const empresas = await Empresa.find({ id_gestor }).select('-senha');

      res.json({ 
        success: true,
        count: empresas.length,
        empresas 
      });

    } catch (error) {
      console.error("❌ Erro ao buscar empresas por gestor:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Listar todas as empresas
  static async listarEmpresas(req, res) {
    try {
      const empresas = await Empresa.find().select('-senha');

      res.json({ 
        success: true,
        count: empresas.length,
        empresas 
      });

    } catch (error) {
      console.error("❌ Erro ao listar empresas:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Atualizar empresa
  static async atualizarEmpresa(req, res) {
    try {
      const { id } = req.params;
      const { id_empresa, nome, cnpj, senha, logo, id_gestor } = req.body;

      const empresaAtualizada = await Empresa.findByIdAndUpdate(
        id,
        { id_empresa, nome, cnpj, senha, logo, id_gestor },
        { new: true, runValidators: true }
      ).select('-senha');

      if (!empresaAtualizada) {
        return res.status(404).json({ 
          success: false,
          message: "Empresa não encontrada" 
        });
      }

      res.json({ 
        success: true,
        message: "Empresa atualizada com sucesso!",
        empresa: empresaAtualizada 
      });

    } catch (error) {
      console.error("❌ Erro ao atualizar empresa:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }

  // Deletar empresa
  static async deletarEmpresa(req, res) {
    try {
      const { id } = req.params;

      const empresaDeletada = await Empresa.findByIdAndDelete(id);

      if (!empresaDeletada) {
        return res.status(404).json({ 
          success: false,
          message: "Empresa não encontrada" 
        });
      }

      res.json({ 
        success: true,
        message: "Empresa deletada com sucesso!" 
      });

    } catch (error) {
      console.error("❌ Erro ao deletar empresa:", error);
      res.status(500).json({ 
        success: false,
        message: "Erro interno do servidor",
        error: error.message 
      });
    }
  }
}

export default EmpresaController;

