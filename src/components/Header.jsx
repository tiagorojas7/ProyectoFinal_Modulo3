import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Barra superior común a todas las pages, con acceso rápido al listado de competencias
export const Header = ({ titulo = "Fútbol Stats" }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
        >
          {titulo}
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Competencias
        </Button>
      </Toolbar>
    </AppBar>
  );
};
