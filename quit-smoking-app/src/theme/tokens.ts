export const colors = {
  primary: "#2E7D32",
  accent: "#81C784",
  background: "#F4F7F4",
  surface: "#FFFFFF",
  text: "#1B1B1B",
  textPrimary: "#1B1B1B",
  textSecondary: "#6B6B6B",
  border: "#E0E0E0",
  error: "#C62828",
  mutedRed: "#E57373",
  success: "#66BB6A",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  small: 8,
  md: 12,
  medium: 16,
  large: 24,
  sm: 8,
} as const;

export const shadows = {
  card: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
} as const;

export const tokens = {
  colors,
  spacing,
  radii,
  shadows,
} as const;
