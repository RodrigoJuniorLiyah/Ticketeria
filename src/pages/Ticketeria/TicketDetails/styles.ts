import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const HeaderCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.medium};
  elevation: 3;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: 600;
  line-height: 32px;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const HeaderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const InfoCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const InfoTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 600;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const InfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 500;

  width: 100px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InfoValue = styled.Text`
  flex: 1;

  font-size: ${({ theme }) => theme.fontSize.sm}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const DescriptionCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const DescriptionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  line-height: 24px;

  color: ${({ theme }) => theme.colors.text};
`;

export const CommentsCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const CommentsList = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 1;

  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.primary};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const ActionButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 600;
  text-align: center;

  color: ${({ theme }) => theme.colors.surface};
`;

export const CommentInputContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;

  padding: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const CommentInputWrapper = styled.View`
  flex: 1;

  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};

  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const CommentInput = styled.TextInput`
  min-height: 40px;
  max-height: 100px;

  font-size: ${({ theme }) => theme.fontSize.md}px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.text};
  text-align-vertical: top;
`;

export const SendButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  justify-content: center;
  align-items: center;

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.border : theme.colors.primary)};
`;

export const EmptyComments = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;

  align-items: center;
`;

export const EmptyCommentsText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  text-align: center;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AttachmentsCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.small};
  elevation: 2;
`;

export const AttachmentsList = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const AttachmentItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const AttachmentLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const AttachmentIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

export const AttachmentInfo = styled.View`
  flex: 1;
`;

export const AttachmentName = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: 500;

  margin-bottom: ${({ theme }) => theme.spacing.xs}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const AttachmentMeta = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xs}px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const AttachmentDownload = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const EmptyAttachments = styled.View`
  padding: ${({ theme }) => theme.spacing.xl}px;

  align-items: center;
`;

export const EmptyAttachmentsText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  text-align: center;

  color: ${({ theme }) => theme.colors.textSecondary};
`;
