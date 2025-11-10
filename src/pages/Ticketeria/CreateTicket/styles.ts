import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

export const Container = styled.ScrollView`
  flex: 1;

  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  padding: ${theme.spacing.md}px;
`;

export const FormGroup = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

export const Label = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: 600;

  margin-bottom: ${theme.spacing.xs}px;

  color: ${theme.colors.text};
`;

export const Input = styled.TextInput`
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border};

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;

  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.surface};
`;

export const TextArea = styled.TextInput`
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border};

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;

  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.surface};
  min-height: 120px;
  text-align-vertical: top;
`;

export const SelectContainer = styled.View`
  border-radius: ${theme.borderRadius.md}px;
  border-width: 1px;
  border-color: ${theme.colors.border};

  background-color: ${theme.colors.surface};
`;

export const SelectButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

export const SelectText = styled.Text`
  font-size: ${theme.fontSize.md}px;

  color: ${theme.colors.text};
`;

export const SelectPlaceholder = styled.Text`
  font-size: ${theme.fontSize.md}px;

  color: ${theme.colors.textSecondary};
`;

export const ErrorText = styled.Text`
  font-size: ${theme.fontSize.xs}px;

  margin-top: ${theme.spacing.xs}px;

  color: ${theme.colors.error};
`;

export const ButtonContainer = styled.View`
  margin-top: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const SubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  border-radius: ${theme.borderRadius.md}px;

  padding: ${theme.spacing.md}px;

  background-color: ${({ disabled }) => (disabled ? theme.colors.border : theme.colors.primary)};
`;

export const SubmitButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: 600;
  text-align: center;

  color: ${theme.colors.surface};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${theme.spacing.xl}px;
`;

export const LoadingText = styled.Text`
  font-size: ${theme.fontSize.md}px;

  margin-top: ${theme.spacing.md}px;

  color: ${theme.colors.textSecondary};
`;

