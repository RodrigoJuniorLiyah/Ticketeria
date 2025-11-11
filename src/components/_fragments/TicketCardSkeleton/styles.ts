import styled from 'styled-components/native';

import { Theme } from '../../../styles/theme';

const getSkeletonColor = (theme: Theme): string => {
  const isDark = theme.colors.background === '#121212';

  if (isDark) {
    return '#2C2C2C';
  }

  return '#E3E8EF';
};

const getSkeletonShadow = (theme: Theme): string => {
  const isDark = theme.colors.background === '#121212';

  if (isDark) {
    return 'none';
  }

  return '0px 1px 2px rgba(0, 0, 0, 0.05)';
};

export const SkeletonCard = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;

  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadows.medium};
  elevation: 3;
`;

export const SkeletonHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const SkeletonTitle = styled.View`
  flex: 1;

  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonBadge = styled.View`
  width: 80px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonBody = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const SkeletonDescription = styled.View`
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonDescriptionShort = styled.View`
  width: 70%;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: ${({ theme }) => theme.spacing.md}px;
  margin-top: ${({ theme }) => theme.spacing.xs}px;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const SkeletonMeta = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const SkeletonCategory = styled.View`
  width: 80px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonPriority = styled.View`
  width: 60px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonDate = styled.View`
  width: 90px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonAuthor = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;

  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const SkeletonAvatar = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;

export const SkeletonAuthorText = styled.View`
  width: 120px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;

  background-color: ${({ theme }) => getSkeletonColor(theme)};

  box-shadow: ${({ theme }) => getSkeletonShadow(theme)};
  elevation: ${({ theme }) => (theme.colors.background === '#121212' ? 0 : 1)};
`;
