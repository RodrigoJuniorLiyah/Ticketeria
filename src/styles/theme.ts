const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#2A4E6E',
    primaryLight: '#4D7A9A',
    secondary: '#4D7A9A',
    success: '#4CAF50',
    warning: '#FFCC80',
    error: '#FF6F61',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#2E3643',
    textSecondary: '#A7B3C4',
    textLight: '#E3E8EF',
    border: '#E3E8EF',
    status: {
      open: '#2A4E6E',
      in_progress: '#FFCC80',
      resolved: '#4CAF50',
      closed: '#A7B3C4',
    },
    priority: {
      low: '#4CAF50',
      medium: '#FFCC80',
      high: '#FF6F61',
      critical: '#FF3B30',
    },
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.16)',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#4D7A9A',
    primaryLight: '#6B9FC4',
    secondary: '#6B9FC4',
    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E0E0E0',
    textSecondary: '#9E9E9E',
    textLight: '#616161',
    border: '#2C2C2C',
    status: {
      open: '#4D7A9A',
      in_progress: '#FFB74D',
      resolved: '#66BB6A',
      closed: '#757575',
    },
    priority: {
      low: '#66BB6A',
      medium: '#FFB74D',
      high: '#EF5350',
      critical: '#E53935',
    },
  },
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.5)',
  },
};

export const theme = lightTheme;

export type Theme = typeof lightTheme;
