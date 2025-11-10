import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${theme.colors.surface};
  border-top-left-radius: ${theme.borderRadius.lg};
  border-top-right-radius: ${theme.borderRadius.lg};
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

export const ModalButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

export const ModalButtonText = styled.Text`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.primary};
`;

