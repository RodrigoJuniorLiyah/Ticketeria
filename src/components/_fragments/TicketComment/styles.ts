import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

export const CommentContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;

  margin-bottom: ${theme.spacing.md}px;
`;

export const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.sm}px;

  background-color: ${theme.colors.primary};
`;

export const AvatarText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: 600;

  color: ${theme.colors.surface};
`;

export const CommentContent = styled.View`
  flex: 1;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${theme.spacing.xs}px;
`;

export const CommentAuthor = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  font-weight: 600;

  margin-right: ${theme.spacing.sm}px;

  color: ${theme.colors.text};
`;

export const CommentDate = styled.Text`
  font-size: ${theme.fontSize.xs}px;

  color: ${theme.colors.textSecondary};
`;

export const CommentBubble = styled.View`
  border-radius: ${theme.borderRadius.md}px;

  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;

  background-color: ${theme.colors.background};
`;

export const CommentText = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  line-height: 20px;

  color: ${theme.colors.text};
`;

