// JavaScript modernizado para a página unificada de login/cadastro

document.addEventListener("DOMContentLoaded", function() {
    // Elementos principais
    const loginSection = document.getElementById('login-section');
    const cadastroSection = document.getElementById('cadastro-section');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Botões de tipo de usuário
    const gestorBtn = document.getElementById('gestor-btn');
    const funcionarioBtn = document.getElementById('funcionario-btn');
    
    // Inicialização
    showLoginSection();
    
    // Event listeners para alternância entre login e cadastro
    if (switchToRegister) {
        switchToRegister.addEventListener('click', showCadastroSection);
    }
    if (switchToLogin) {
        switchToLogin.addEventListener('click', showLoginSection);
    }
    
    // Event listeners para tipo de usuário
    if (gestorBtn) {
        gestorBtn.addEventListener('click', () => selectUserType('gestor'));
    }
    if (funcionarioBtn) {
        funcionarioBtn.addEventListener('click', () => selectUserType('funcionario'));
    }
    
    // Função para mostrar seção de login com animação
    function showLoginSection() {
        if (cadastroSection) {
            cadastroSection.classList.add('hidden');
        }
        if (loginSection) {
            setTimeout(() => {
                loginSection.classList.remove('hidden');
                loginSection.style.animation = 'slideIn 0.6s ease-out';
            }, 100);
        }
    }
    
    // Função para mostrar seção de cadastro com animação
    function showCadastroSection() {
        if (loginSection) {
            loginSection.classList.add('hidden');
        }
        if (cadastroSection) {
            setTimeout(() => {
                cadastroSection.classList.remove('hidden');
                cadastroSection.style.animation = 'slideIn 0.6s ease-out';
            }, 100);
        }
    }
    
    // Função para selecionar tipo de usuário
    function selectUserType(type) {
        if (type === 'gestor') {
            if (gestorBtn) gestorBtn.classList.add('active');
            if (funcionarioBtn) funcionarioBtn.classList.remove('active');
        } else {
            if (funcionarioBtn) funcionarioBtn.classList.add('active');
            if (gestorBtn) gestorBtn.classList.remove('active');
        }
    }
    
    // Formatação de CPF com animação
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
            
            // Animação de validação visual
            if (validarCPF(value)) {
                e.target.style.borderColor = '#4ade80';
                e.target.style.boxShadow = '0 0 0 4px rgba(74, 222, 128, 0.1)';
            } else if (value.length >= 11) {
                e.target.style.borderColor = '#ef4444';
                e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            } else {
                e.target.style.borderColor = 'rgba(251, 197, 49, 0.3)';
                e.target.style.boxShadow = 'none';
            }
        });
    }
    
    // Formatação de CNPJ com animação
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
            
            // Animação de validação visual
            if (validarCNPJ(value)) {
                e.target.style.borderColor = '#4ade80';
                e.target.style.boxShadow = '0 0 0 4px rgba(74, 222, 128, 0.1)';
            } else if (value.length >= 14) {
                e.target.style.borderColor = '#ef4444';
                e.target.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
            } else {
                e.target.style.borderColor = 'rgba(251, 197, 49, 0.3)';
                e.target.style.boxShadow = 'none';
            }
        });
    }
    
    // Animação para inputs focados
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Verificar se já tem valor ao carregar
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Animação para cards de preço
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove seleção de outros cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            // Adiciona seleção ao card clicado
            this.classList.add('selected');
            
            // Animação de seleção
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Efeito visual de seleção
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
    
    // Manipulação do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Animação de loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Entrando...</span>';
            submitBtn.disabled = true;
            
            const usuario = document.getElementById('login_usuario').value;
            const senha = document.getElementById('login_senha').value;
            const tipoUsuario = gestorBtn && gestorBtn.classList.contains('active') ? 'gestor' : 'funcionario';
            
            // Simular processo de login
            setTimeout(() => {
                console.log('Login:', { usuario, senha, tipoUsuario });
                
                // Animação de sucesso
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Sucesso!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
                
                setTimeout(() => {
                    alert('Login realizado com sucesso!');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 1500);
            }, 2000);
        });
    }
    
    // Manipulação do formulário de cadastro final
    const step3Form = document.getElementById('step3Form');
    if (step3Form) {
        step3Form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Animação de loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Finalizando...</span>';
            submitBtn.disabled = true;
            
            // Coleta todos os dados do cadastro
            const dadosCadastro = {
                // Dados pessoais
                usuario: document.getElementById('nome_chefe')?.value,
                email: document.getElementById('email')?.value,
                senha: document.getElementById('senha')?.value,
                cpf: document.getElementById('cpf')?.value,
                
                // Dados da empresa
                nomeEmpresa: document.getElementById('nome_empresa')?.value,
                cnpj: document.getElementById('cnpj')?.value,
                senhaEmpresa: document.getElementById('senha_empresa')?.value,
                
                // Plano selecionado
                plano: document.querySelector('input[name="plano"]:checked')?.value
            };
            
            // Simular processo de cadastro
            setTimeout(() => {
                console.log('Cadastro:', dadosCadastro);
                
                // Animação de sucesso
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Cadastro Concluído!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
                
                setTimeout(() => {
                    alert('Cadastro realizado com sucesso!');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 1500);
            }, 2000);
        });
    }
});

// Variável global para controlar a etapa atual
let currentStep = 1;

// Função para avançar para a próxima etapa com animação
function nextStep(step) {
    if (validateStep(step)) {
        const currentContent = document.getElementById(`step-${step}-content`);
        const nextContent = document.getElementById(`step-${step + 1}-content`);
        
        if (currentContent && nextContent) {
            // Animação de saída
            currentContent.style.animation = 'fadeOutLeft 0.3s ease-out';
            
            setTimeout(() => {
                currentContent.classList.add('hidden');
                nextContent.classList.remove('hidden');
                
                // Animação de entrada
                nextContent.style.animation = 'fadeInRight 0.3s ease-out';
                
                updateTimeline(step + 1);
                currentStep = step + 1;
            }, 300);
        }
    }
}

// Função para voltar para a etapa anterior com animação
function prevStep(step) {
    const currentContent = document.getElementById(`step-${step}-content`);
    const prevContent = document.getElementById(`step-${step - 1}-content`);
    
    if (currentContent && prevContent) {
        // Animação de saída
        currentContent.style.animation = 'fadeOutRight 0.3s ease-out';
        
        setTimeout(() => {
            currentContent.classList.add('hidden');
            prevContent.classList.remove('hidden');
            
            // Animação de entrada
            prevContent.style.animation = 'fadeInLeft 0.3s ease-out';
            
            updateTimeline(step - 1);
            currentStep = step - 1;
        }, 300);
    }
}

// Função para atualizar a timeline de progresso com animação
function updateTimeline(activeStep) {
    // Remove todas as classes ativas
    for (let i = 1; i <= 4; i++) {
        const step = document.getElementById(`step-${i}`);
        const line = document.getElementById(`line-${i}`);
        
        if (step) {
            step.classList.remove('active');
        }
        if (line) {
            line.classList.remove('active');
        }
    }
    
    // Adiciona classes ativas até a etapa atual com delay para animação
    for (let i = 1; i <= activeStep; i++) {
        setTimeout(() => {
            const step = document.getElementById(`step-${i}`);
            if (step) {
                step.classList.add('active');
            }
            
            if (i < activeStep) {
                const line = document.getElementById(`line-${i}`);
                if (line) {
                    line.classList.add('active');
                }
            }
        }, (i - 1) * 100);
    }
}

// Função para validar uma etapa antes de avançar
function validateStep(step) {
    let isValid = true;
    const form = document.getElementById(`step${step}Form`);
    
    if (form) {
        const requiredFields = form.querySelectorAll('input[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                // Animação de erro
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
                field.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
                
                isValid = false;
            } else {
                field.style.borderColor = '#4ade80';
                field.style.boxShadow = '0 0 0 4px rgba(74, 222, 128, 0.1)';
            }
        });
        
        // Validações específicas
        if (step === 1) {
            const senha = document.getElementById('senha')?.value;
            const confirmarSenha = document.getElementById('confirmar_senha')?.value;
            
            if (senha !== confirmarSenha) {
                showErrorMessage('As senhas não coincidem!');
                isValid = false;
            }
            
            const cpf = document.getElementById('cpf')?.value;
            if (!validarCPF(cpf)) {
                showErrorMessage('CPF inválido!');
                isValid = false;
            }
        }
        
        if (step === 2) {
            const senhaEmpresa = document.getElementById('senha_empresa')?.value;
            const confirmarSenhaEmpresa = document.getElementById('confirmar_senha_empresa')?.value;
            
            if (senhaEmpresa !== confirmarSenhaEmpresa) {
                showErrorMessage('As senhas da empresa não coincidem!');
                isValid = false;
            }
            
            const cnpj = document.getElementById('cnpj')?.value;
            if (!validarCNPJ(cnpj)) {
                showErrorMessage('CNPJ inválido!');
                isValid = false;
            }
        }
    }
    
    if (!isValid) {
        showErrorMessage('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
    
    return isValid;
}

// Função para mostrar mensagens de erro com estilo moderno
function showErrorMessage(message) {
    // Remove mensagem anterior se existir
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Cria nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Adiciona estilos
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove após 4 segundos
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 4000);
}

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Função para validar CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    
    if (cnpj.length !== 14) return false;
    
    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    
    return true;
}

// Adicionar animações CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutLeft {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-30px); }
    }
    
    @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(30px); }
    }
    
    @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

