import styled from 'styled-components/native';

const getContrastColor = (theme: any, lightColor: string, darkColor: string) => {
  const isLight = theme.colors.background === '#F5F7FA';
  return isLight ? lightColor : darkColor;
};

export const Container = styled.ScrollView`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const FormCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const FormGroup = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 600;

  margin-bottom: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;

  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};

  padding-left: ${({ theme }) => theme.spacing.md}px;
  padding-right: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Input = styled.TextInput`
  flex: 1;

  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.sm}px;

  font-size: ${({ theme }) => theme.fontSize.md}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const TextAreaContainer = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};

  padding: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TextArea = styled.TextInput`
  min-height: 120px;

  font-size: ${({ theme }) => theme.fontSize.md}px;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.text};
`;

export const SelectContainer = styled.View<{ hasError?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1.5px;
  border-color: ${({ hasError, theme }) => (hasError ? theme.colors.error : theme.colors.border)};

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const SelectButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.md}px;
  min-height: 48px;
`;

export const SelectLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SelectIcon = styled.View`
  width: 24px;
  height: 24px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  justify-content: center;
  align-items: center;
`;

export const SelectText = styled.Text`
  flex: 1;

  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.text};
`;

export const SelectPlaceholder = styled.Text`
  flex: 1;

  font-size: ${({ theme }) => theme.fontSize.md}px;

  color: ${({ theme }) => getContrastColor(theme, '#6B7280', theme.colors.textSecondary)};
`;

export const SelectArrow = styled.View`
  width: 24px;
  height: 24px;

  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;

  margin-top: ${({ theme }) => theme.spacing.xs}px;

  color: ${({ theme }) => theme.colors.error};
`;

export const ButtonContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const SubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.border : theme.colors.primary)};

  box-shadow: ${({ disabled, theme }) => (disabled ? 'none' : theme.shadows.small)};
  elevation: ${({ disabled }) => (disabled ? 0 : 2)};
`;

export const SubmitButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
  text-align: center;

  color: ${({ theme }) => theme.colors.surface};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.xl}px;
`;

export const LoadingText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;

  margin-top: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AttachmentsContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export const AttachmentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: dashed;

  padding: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const AttachmentButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 500;

  margin-left: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const AttachmentsList = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const AttachmentItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const AttachmentInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const AttachmentIcon = styled.View`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

export const AttachmentDetails = styled.View`
  flex: 1;
`;

export const AttachmentName = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 500;

  margin-bottom: ${({ theme }) => theme.spacing.xs}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const AttachmentSize = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AttachmentRemove = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.error};
`;

