import { Avatar, Link as MuiLink, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const API = "/api-futbol/competitions";

export const ListadoCompetencias = () => {
  const { data: competencias, loading, error } = useFetch(API);

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const competenciasConImagen = competencias?.competitions?.filter(
    (competencia) => Boolean(competencia.emblemUrl)
  ) ?? [];

  if (competenciasConImagen.length === 0) {
    return <Typography>No hay competencias con imagen disponible.</Typography>;
  }

  return (
    <>
      <Typography variant="h4" component="h1">
        Todas las competencias
      </Typography>
      <List>
        {competenciasConImagen.map((competencia) => (
          <ListItem key={competencia.id} divider>
            <ListItemAvatar>
              <Avatar src={competencia.emblemUrl} alt={competencia.name} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={competencia.name} />
            <MuiLink component={Link} to={`/posiciones/${competencia.id}`}>
              Ver estadísticas
            </MuiLink>
          </ListItem>
        ))}
      </List>
    </>
  );
};
