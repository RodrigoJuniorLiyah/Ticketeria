import styled from 'styled-components/native';

export const CommentContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const AvatarText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.surface};
`;

export const CommentContent = styled.View`
  flex: 1;
`;

export const CommentHeader = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const CommentAuthor = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 600;

  margin-right: ${({ theme }) => theme.spacing.sm}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const CommentDate = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CommentBubble = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const CommentText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.text};
`;

