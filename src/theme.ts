import { Theme, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode): Theme => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
      ...(mode === 'dark' && {
        main: '#424242',
        light: '#616161',
        dark: '#212121'
      })
    },
    secondary: {
      main: '#9c27b0',
      ...(mode === 'dark' && {
        main: '#757575',
        light: '#9e9e9e',
        dark: '#616161'
      })
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#fff' : '#1e1e1e'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(mode === 'dark' && {
            border: '1px solid rgba(255, 255, 255, 0.23)',
            borderRadius: '8px'
          })
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          ...(mode === 'dark' && {
            border: '1px solid rgba(255, 255, 255, 0.23)',
            borderRadius: '8px'
          })
        }
      }
    }
  }
});