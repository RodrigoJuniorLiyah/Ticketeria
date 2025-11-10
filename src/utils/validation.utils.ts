export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Senha é obrigatória' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Senha deve ter no mínimo 6 caracteres' };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Nome é obrigatório' };
  }

  if (name.length < 3) {
    return { isValid: false, error: 'Nome deve ter no mínimo 3 caracteres' };
  }

  return { isValid: true };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Confirmação de senha é obrigatória' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'As senhas não coincidem' };
  }

  return { isValid: true };
};

export const validateTicketTitle = (title: string): ValidationResult => {
  if (!title) {
    return { isValid: false, error: 'Título é obrigatório' };
  }

  if (title.length < 5) {
    return { isValid: false, error: 'Título deve ter no mínimo 5 caracteres' };
  }

  return { isValid: true };
};

export const validateTicketDescription = (description: string): ValidationResult => {
  if (!description) {
    return { isValid: false, error: 'Descrição é obrigatória' };
  }

  if (description.length < 10) {
    return { isValid: false, error: 'Descrição deve ter no mínimo 10 caracteres' };
  }

  return { isValid: true };
};

export const validateTicketCategory = (category: string): ValidationResult => {
  if (!category) {
    return { isValid: false, error: 'Categoria é obrigatória' };
  }

  return { isValid: true };
};
