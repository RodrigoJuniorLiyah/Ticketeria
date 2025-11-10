import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxxl}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FormCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  elevation: 4;
`;

export const FormGroup = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const InputContainer = styled.View<{ hasError?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1.5px;
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const InputIcon = styled(Ionicons)<{ onPress?: () => void }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const Input = styled(TextInput)`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const SubmitButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textSecondary : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
`;

export const SubmitButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
`;

export const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const LoadingText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
`;

export const LoginContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const LoginText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LoginButton = styled(TouchableOpacity)``;

export const LoginButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;


