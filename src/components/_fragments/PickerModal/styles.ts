import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.5);

  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  width: 100%;
  max-height: 60%;

  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.xl}px;

  box-shadow: ${({ theme }) => theme.shadows.large};
  elevation: 8;
`;

export const ModalHandle = styled.View`
  width: 40px;
  height: 4px;

  margin: ${({ theme }) => theme.spacing.sm}px auto;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;

  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  min-width: 80px;

  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;

  color: ${({ variant, theme }) => {
    if (variant === 'primary') {
      return theme.colors.primary;
    }
    return theme.colors.textSecondary;
  }};
`;

export const PickerContainer = styled.View`
  max-height: 300px;

  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.colors.surface};
`;

export const StyledPicker = styled(Picker)`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;
