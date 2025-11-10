import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

export const Container = styled.View`
  flex: 1;

  background-color: ${theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const HeaderCard = styled.View`
  border-radius: ${theme.borderRadius.lg}px;

  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};

  box-shadow: ${theme.shadows.medium};
  elevation: 3;
`;

export const Title = styled.Text`
  font-size: ${theme.fontSize.xxl}px;
  font-weight: 600;
  line-height: 32px;

  margin-bottom: ${theme.spacing.md}px;

  color: ${theme.colors.text};
`;

export const HeaderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: ${theme.spacing.md}px;
`;

export const InfoCard = styled.View`
  border-radius: ${theme.borderRadius.lg}px;

  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};

  box-shadow: ${theme.shadows.small};
  elevation: 2;
`;

export const InfoTitle = styled.Text`
  font-size: ${theme.fontSize.lg}px;
  font-weight: 600;

  margin-bottom: ${theme.spacing.md}px;

  color: ${theme.colors.text};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${theme.spacing.sm}px;
`;

export const InfoLabel = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: 500;

  width: 100px;

  color: ${theme.colors.textSecondary};
`;

export const InfoValue = styled.Text`
  flex: 1;

  font-size: ${theme.fontSize.sm}px;

  color: ${theme.colors.text};
`;

export const DescriptionCard = styled.View`
  border-radius: ${theme.borderRadius.lg}px;

  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};

  box-shadow: ${theme.shadows.small};
  elevation: 2;
`;

export const DescriptionText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  line-height: 24px;

  color: ${theme.colors.text};
`;

export const CommentsCard = styled.View`
  border-radius: ${theme.borderRadius.lg}px;

  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};

  box-shadow: ${theme.shadows.small};
  elevation: 2;
`;

export const CommentsList = styled.View`
  margin-top: ${theme.spacing.md}px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.sm}px;

  background-color: ${theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;

  border-radius: ${theme.borderRadius.lg}px;

  padding: ${theme.spacing.md}px;
  margin-right: ${theme.spacing.sm}px;

  background-color: ${theme.colors.primary};

  box-shadow: ${theme.shadows.small};
  elevation: 2;
`;

export const ActionButtonText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  font-weight: 600;
  text-align: center;

  color: ${theme.colors.surface};
`;

export const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;

  padding: ${theme.spacing.md}px;

  background-color: ${theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

export const CommentInputWrapper = styled.View`
  flex: 1;

  border-radius: ${theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${theme.colors.border};

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  margin-right: ${theme.spacing.sm}px;

  background-color: ${theme.colors.background};
`;

export const CommentInput = styled.TextInput`
  min-height: 40px;
  max-height: 100px;

  font-size: ${theme.fontSize.md}px;
  line-height: 20px;

  color: ${theme.colors.text};
  text-align-vertical: top;
`;

export const SendButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ disabled }) => (disabled ? theme.colors.border : theme.colors.primary)};
`;

export const EmptyComments = styled.View`
  padding: ${theme.spacing.xl}px;

  align-items: center;
`;

export const EmptyCommentsText = styled.Text`
  font-size: ${theme.fontSize.md}px;
  text-align: center;

  color: ${theme.colors.textSecondary};
`;
