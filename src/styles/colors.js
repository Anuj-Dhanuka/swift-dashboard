// src/styles/colors.js

// Primary Colors
export const colors = {
  // Backgrounds
  background: {
    primary: '#f8fafc',      // App/page background
    surface: '#ffffff',       // Cards, modals, table rows
    navbar: '#272a4b',        // Top navbar
    sidebar: '#272a4b',       // Sidebar (match navbar for unity)
    tableHeader: '#272a4b',   // Table header background
    tableRowEven: '#ffffff',
    tableRowOdd: '#f0f2f5',
  },

  // Text Colors
  text: {
    primary: '#1e1e2f',       // Main content text
    muted: '#6b7280',         // Secondary text/labels
    white: '#ffffff',
    onDark: '#f9fafb',
  },

  // UI Colors
  ui: {
    primary: '#272a4b',        // Primary UI controls (icons, borders if needed)
    primaryHover: '#1f213e',   // Darker hover variant
    secondary: '#00c48c',      // Accent green from logo
    secondaryHover: '#00a97b', // Darker hover green
    border: '#d1d5db',
    borderLight: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Status Colors (unchanged)
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Table Specific
  table: {
    headerBg: '#272a4b',
    headerText: '#ffffff',
    rowEven: '#ffffff',
    rowOdd: '#f0f2f5',
    cellText: '#1e1e2f',
    columnBorder: '#d1d5db',
    rowBorder: '#e5e7eb',
  },

  // Buttons
  button: {
    primary: '#272a4b',
    primaryHover: '#1f213e',
    secondary: '#00c48c',
    secondaryHover: '#00a97b',
    text: '#ffffff',
    textSecondary: '#1e1e2f',
  },
};

// Export individual categories for cleaner imports
export const {
  background,
  text,
  ui,
  status,
  table,
  button,
} = colors;

export default colors;
