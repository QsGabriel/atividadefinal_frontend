/**
 * FORM VALIDATION
 * Funcionalidades:
 * - Validação de formulário de contato
 * - Feedback visual e acessível
 * - Mensagens de erro/sucesso
 */

(function() {
  'use strict';

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  // ===== VALIDATION RULES =====
  const validationRules = {
    name: {
      required: true,
      minLength: 3,
      pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
      errorMessages: {
        required: 'Por favor, informe seu nome',
        minLength: 'O nome deve ter pelo menos 3 caracteres',
        pattern: 'O nome deve conter apenas letras'
      }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessages: {
        required: 'Por favor, informe seu email',
        pattern: 'Por favor, informe um email válido'
      }
    },
    subject: {
      required: true,
      minLength: 5,
      errorMessages: {
        required: 'Por favor, informe o assunto',
        minLength: 'O assunto deve ter pelo menos 5 caracteres'
      }
    },
    message: {
      required: true,
      minLength: 10,
      errorMessages: {
        required: 'Por favor, escreva sua mensagem',
        minLength: 'A mensagem deve ter pelo menos 10 caracteres'
      }
    }
  };

  // ===== VALIDATE FIELD =====
  const validateField = (field) => {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (!rules) return true;

    // Required
    if (rules.required && !fieldValue) {
      showError(field, errorElement, rules.errorMessages.required);
      return false;
    }

    // Min Length
    if (rules.minLength && fieldValue.length < rules.minLength) {
      showError(field, errorElement, rules.errorMessages.minLength);
      return false;
    }

    // Pattern
    if (rules.pattern && !rules.pattern.test(fieldValue)) {
      showError(field, errorElement, rules.errorMessages.pattern);
      return false;
    }

    // Se passou em todas as validações
    clearError(field, errorElement);
    return true;
  };

  // ===== SHOW ERROR =====
  const showError = (field, errorElement, message) => {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };

  // ===== CLEAR ERROR =====
  const clearError = (field, errorElement) => {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  };

  // ===== VALIDATE FORM =====
  const validateForm = () => {
    const fields = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  };

  // ===== SHOW MESSAGE =====
  const showMessage = (message, type) => {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Remover mensagem após 5 segundos
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    // Simular envio (em produção, aqui seria feita a requisição ao servidor)
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      // Adicionar estado de loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Dados do formulário:', data);

      // Sucesso
      showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      contactForm.reset();

      // Remover loading
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      showMessage('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  };

  // ===== REAL-TIME VALIDATION =====
  const setupRealTimeValidation = () => {
    const fields = contactForm.querySelectorAll('input, textarea');

    fields.forEach(field => {
      // Validar ao sair do campo
      field.addEventListener('blur', () => {
        validateField(field);
      });

      // Limpar erro ao digitar
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          const errorElement = document.getElementById(`${field.name}Error`);
          clearError(field, errorElement);
        }
      });
    });
  };

  // ===== EVENT LISTENERS =====
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
    setupRealTimeValidation();
  }
})();
