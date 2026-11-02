import { createTheme } from "@mui/material";

// Tema global de la app: colores y estilos por defecto de los componentes de MUI
export const theme = createTheme({
  palette: {
    primary: { main: "#1b5e20" },
    secondary: { main: "#ff9800" },
    background: { default: "#f5f5f5" },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained", size: "small" },
    },
    MuiTableCell: {
      styleOverrides: { head: { fontWeight: "bold" } },
    },
  },
});
