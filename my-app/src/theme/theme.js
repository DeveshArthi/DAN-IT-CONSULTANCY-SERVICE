
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
      light: '#C4B5FD',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#C4B5FD',
    },
    background: {
      default: '#08070D',
      paper: '#151122',
    },
    text: {
      primary: '#F8F7FF',
      secondary: '#A7A3B5',
    },
  },

  typography: {
    fontFamily: '"Inter", sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: '-0.045em',
    },

    h2: {
      fontWeight: 700,
      letterSpacing: '-0.035em',
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '11px 24px',
          boxShadow: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(196,181,253,0.10)',
        },
      },
    },
  },
});

export default theme;
