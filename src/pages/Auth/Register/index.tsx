import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../../../utils/validation.utils';
import {
  ButtonContainer,
  Container,
  Content,
  ErrorText,
  FormCard,
  FormGroup,
  Input,
  InputContainer,
  InputIcon,
  Label,
  LoadingContainer,
  LoadingText,
  LoginButton,
  LoginButtonText,
  LoginContainer,
  LoginText,
  LogoContainer,
  LogoText,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const Register = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

    setNameError(nameValidation.error || '');
    setEmailError(emailValidation.error || '');
    setPasswordError(passwordValidation.error || '');
    setConfirmPasswordError(confirmPasswordValidation.error || '');

    return (
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid
    );
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await register({ name, email, password, confirmPassword });
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <Container>
      {}
      {/* Exceção: KeyboardAvoidingView requer flex: 1 para funcionar corretamente */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {}
        {/* Exceção: contentContainerStyle é propriedade específica do ScrollView */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Content>
            <LogoContainer>
              <LogoText>🎫 Ticketeria</LogoText>
            </LogoContainer>

            <FormCard>
              <FormGroup>
                <Label>Nome</Label>
                <InputContainer hasError={!!nameError}>
                  <InputIcon name="person-outline" size={20} />
                  <Input
                    placeholder="Seu nome completo"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={name}
                    onChangeText={text => {
                      setName(text);
                      if (nameError) setNameError('');
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </InputContainer>
                {nameError ? <ErrorText>{nameError}</ErrorText> : null}
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <InputContainer hasError={!!emailError}>
                  <InputIcon name="mail-outline" size={20} />
                  <Input
                    placeholder="seu@email.com"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                      if (emailError) setEmailError('');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </InputContainer>
                {emailError ? <ErrorText>{emailError}</ErrorText> : null}
              </FormGroup>

              <FormGroup>
                <Label>Senha</Label>
                <InputContainer hasError={!!passwordError}>
                  <InputIcon name="lock-closed-outline" size={20} />
                  <Input
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      if (passwordError) setPasswordError('');
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputIcon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    onPress={() => setShowPassword(!showPassword)}
                    noMargin
                  />
                </InputContainer>
                {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
              </FormGroup>

              <FormGroup>
                <Label>Confirmar Senha</Label>
                <InputContainer hasError={!!confirmPasswordError}>
                  <InputIcon name="lock-closed-outline" size={20} />
                  <Input
                    placeholder="Digite a senha novamente"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={confirmPassword}
                    onChangeText={text => {
                      setConfirmPassword(text);
                      if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <InputIcon
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    noMargin
                  />
                </InputContainer>
                {confirmPasswordError ? <ErrorText>{confirmPasswordError}</ErrorText> : null}
              </FormGroup>

              <ButtonContainer>
                <SubmitButton onPress={handleRegister} disabled={isLoading}>
                  {isLoading ? (
                    <LoadingContainer>
                      <ActivityIndicator color={theme.colors.surface} size="small" />
                      <LoadingText>Criando conta...</LoadingText>
                    </LoadingContainer>
                  ) : (
                    <SubmitButtonText>Criar Conta</SubmitButtonText>
                  )}
                </SubmitButton>
              </ButtonContainer>

              <LoginContainer>
                <LoginText>Já tem uma conta?</LoginText>
                <LoginButton onPress={() => navigation.goBack()}>
                  <LoginButtonText>Entrar</LoginButtonText>
                </LoginButton>
              </LoginContainer>
            </FormCard>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Register;
