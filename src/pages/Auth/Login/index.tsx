import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { validateEmail, validatePassword } from '../../../utils/validation.utils';
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
  KeyboardAvoidingContainer,
  Label,
  LoadingContainer,
  LoadingText,
  LogoContainer,
  LogoText,
  RegisterButton,
  RegisterButtonText,
  RegisterContainer,
  RegisterText,
  ScrollContent,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const Login = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('123456');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation.error || '');
    setPasswordError(passwordValidation.error || '');

    return emailValidation.isValid && passwordValidation.isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login({ email, password });
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <Container>
      <KeyboardAvoidingContainer>
        <ScrollContent>
          <Content>
            <LogoContainer>
              <LogoText>🎫 Ticketeria</LogoText>
            </LogoContainer>

            <FormCard>
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
                    placeholder="Sua senha"
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

              <ButtonContainer>
                <SubmitButton onPress={handleLogin} disabled={isLoading}>
                  {isLoading ? (
                    <LoadingContainer>
                      <ActivityIndicator color={theme.colors.surface} size="small" />
                      <LoadingText>Entrando...</LoadingText>
                    </LoadingContainer>
                  ) : (
                    <SubmitButtonText>Entrar</SubmitButtonText>
                  )}
                </SubmitButton>
              </ButtonContainer>

              <RegisterContainer>
                <RegisterText>Não tem uma conta?</RegisterText>
                <RegisterButton onPress={() => navigation.navigate('Register' as never)}>
                  <RegisterButtonText>Cadastre-se</RegisterButtonText>
                </RegisterButton>
              </RegisterContainer>
            </FormCard>
          </Content>
        </ScrollContent>
      </KeyboardAvoidingContainer>
    </Container>
  );
};

export default Login;
