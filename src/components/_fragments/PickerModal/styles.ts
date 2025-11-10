import styled from 'styled-components/native';

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.lg}px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ModalButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

export const ModalButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

