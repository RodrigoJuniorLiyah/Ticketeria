import styled from 'styled-components/native';

import { theme } from '../../../styles/theme';

export const Card = styled.TouchableOpacity`
  border-radius: ${theme.borderRadius.md}px;

  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.sm}px;

  background-color: ${theme.colors.surface};

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  elevation: 2;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: ${theme.spacing.sm}px;
`;

export const CardTitle = styled.Text`
  flex: 1;

  margin-right: ${theme.spacing.sm}px;

  font-size: ${theme.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

export const CardBody = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
`;

export const CardDescription = styled.Text`
  font-size: ${theme.fontSize.sm}px;
  line-height: 20px;

  color: ${theme.colors.textSecondary};
`;

export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${theme.spacing.sm}px;
`;

export const CardMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardMetaText = styled.Text`
  font-size: ${theme.fontSize.xs}px;

  margin-left: ${theme.spacing.xs}px;

  color: ${theme.colors.textSecondary};
`;

export const CardCategory = styled.Text`
  font-size: ${theme.fontSize.xs}px;

  color: ${theme.colors.textSecondary};
`;

