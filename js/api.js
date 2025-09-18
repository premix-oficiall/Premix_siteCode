// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Classe para gerenciar as requisições da API
class ApiService {
  
  // Método auxiliar para fazer requisições HTTP
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }
      
      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Métodos para Gestor
  static async cadastrarGestor(dadosGestor) {
    return this.request('/gestores', {
      method: 'POST',
      body: JSON.stringify(dadosGestor)
    });
  }

  static async loginGestor(credenciais) {
    return this.request('/gestores/login', {
      method: 'POST',
      body: JSON.stringify(credenciais)
    });
  }

  static async listarGestores() {
    return this.request('/gestores');
  }

  static async buscarGestorPorId(id) {
    return this.request(`/gestores/${id}`);
  }

  // Métodos para Usuário
  static async cadastrarUsuario(dadosUsuario) {
    return this.request('/usuarios', {
      method: 'POST',
      body: JSON.stringify(dadosUsuario)
    });
  }

  static async loginUsuario(credenciais) {
    return this.request('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(credenciais)
    });
  }

  // Métodos para Empresa
  static async cadastrarEmpresa(dadosEmpresa) {
    return this.request('/empresas', {
      method: 'POST',
      body: JSON.stringify(dadosEmpresa)
    });
  }

  static async buscarEmpresasPorGestor(idGestor) {
    return this.request(`/empresas/gestor/${idGestor}`);
  }

  // Método para testar a API
  static async testarAPI() {
    return this.request('/test');
  }
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'success') {
  // Remove notificação anterior se existir
  const notificacaoExistente = document.querySelector('.api-notification');
  if (notificacaoExistente) {
    notificacaoExistente.remove();
  }

  // Cria nova notificação
  const notificacao = document.createElement('div');
  notificacao.className = `api-notification ${tipo}`;
  
  const icone = tipo === 'success' ? '✅' : '❌';
  notificacao.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icone}</span>
      <span class="notification-message">${mensagem}</span>
    </div>
  `;

  // Estilos da notificação
  notificacao.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${tipo === 'success' ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
    color: white;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;

  document.body.appendChild(notificacao);

  // Remove após 4 segundos
  setTimeout(() => {
    notificacao.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      notificacao.remove();
    }, 300);
  }, 4000);
}

// Função para atualizar o formulário de cadastro para usar a API real
function atualizarFormularioCadastro() {
  const step3Form = document.getElementById('step3Form');
  if (step3Form) {
    // Remove o event listener anterior
    const novoForm = step3Form.cloneNode(true);
    step3Form.parentNode.replaceChild(novoForm, step3Form);
    
    // Adiciona novo event listener que usa a API
    novoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Animação de loading
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Cadastrando...</span>';
      submitBtn.disabled = true;
      
      try {
        // Coleta dados do gestor
        const dadosGestor = {
          username: document.getElementById('nome_chefe')?.value,
          usuario: document.getElementById('email')?.value, // Usando email como usuario
          password: document.getElementById('senha')?.value
        };
        
        // Cadastra o gestor
        const resultadoGestor = await ApiService.cadastrarGestor(dadosGestor);
        console.log('Gestor cadastrado:', resultadoGestor);
        
        // Se o gestor foi cadastrado com sucesso, cadastra a empresa
        if (resultadoGestor.success) {
          const dadosEmpresa = {
            nome: document.getElementById('nome_empresa')?.value,
            cnpj: document.getElementById('cnpj')?.value,
            senha: document.getElementById('senha_empresa')?.value,
            id_gestor: resultadoGestor.gestorId,
            logo: null // Por enquanto sem logo
          };
          
          const resultadoEmpresa = await ApiService.cadastrarEmpresa(dadosEmpresa);
          console.log('Empresa cadastrada:', resultadoEmpresa);
          
          // Animação de sucesso
          submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Cadastro Concluído!</span>';
          submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
          
          mostrarNotificacao('Gestor e empresa cadastrados com sucesso!');
          
          // Salva dados no localStorage para uso posterior
          localStorage.setItem('gestorLogado', JSON.stringify(resultadoGestor.gestor));
          
        }
        
      } catch (error) {
        console.error('Erro no cadastro:', error);
        mostrarNotificacao(error.message || 'Erro ao realizar cadastro', 'error');
        
        // Restaura botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }
      
      // Restaura botão após sucesso
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2000);
    });
  }
}

// Função para atualizar o formulário de login para usar a API real
function atualizarFormularioLogin() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Remove o event listener anterior
    const novoForm = loginForm.cloneNode(true);
    loginForm.parentNode.replaceChild(novoForm, loginForm);
    
    // Adiciona novo event listener que usa a API
    novoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Animação de loading
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Entrando...</span>';
      submitBtn.disabled = true;
      
      try {
        const usuario = document.getElementById('login_usuario').value;
        const password = document.getElementById('login_senha').value;
        
        // Determina se é gestor ou funcionário
        const gestorBtn = document.getElementById('gestor-btn');
        const isGestor = gestorBtn && gestorBtn.classList.contains('active');
        
        let resultado;
        if (isGestor) {
          resultado = await ApiService.loginGestor({ usuario, password });
        } else {
          // Para funcionário, usa email como campo de login
          resultado = await ApiService.loginUsuario({ email: usuario, senha: password });
        }
        
        console.log('Login realizado:', resultado);
        
        // Animação de sucesso
        submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Sucesso!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
        
        mostrarNotificacao('Login realizado com sucesso!');
        
        // Salva dados no localStorage
        if (isGestor) {
          localStorage.setItem('gestorLogado', JSON.stringify(resultado.gestor));
        } else {
          localStorage.setItem('usuarioLogado', JSON.stringify(resultado.usuario));
        }
        
      } catch (error) {
        console.error('Erro no login:', error);
        mostrarNotificacao(error.message || 'Erro ao realizar login', 'error');
        
        // Restaura botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }
      
      // Restaura botão após sucesso
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2000);
    });
  }
}

// Inicializa as atualizações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Aguarda um pouco para garantir que os formulários foram criados
  setTimeout(() => {
    atualizarFormularioCadastro();
    atualizarFormularioLogin();
  }, 1000);
});

// Adiciona estilos para as animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-icon {
    font-size: 18px;
  }
  
  .notification-message {
    font-size: 14px;
  }
`;
document.head.appendChild(style);

