import { List, ListItem, ListItemText, Typography } from "@mui/material";

// Sirve para próximos partidos de una liga y para historial/próximos de un equipo
export const ListaPartidos = ({ titulo, partidos = [] }) => {
  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
        {titulo}
      </Typography>

      {partidos.length === 0 && <Typography>No hay partidos.</Typography>}

      <List>
        {partidos.map((partido) => {
          const { homeTeam, awayTeam } = partido.score.fullTime;
          // Si el partido no se jugó todavía no hay goles
          const resultado = homeTeam === null ? "vs" : `${homeTeam} - ${awayTeam}`;

          return (
            <ListItem key={partido.id} divider>
              <ListItemText
                primary={`${partido.homeTeam.name} ${resultado} ${partido.awayTeam.name}`}
                secondary={new Date(partido.utcDate).toLocaleDateString("es-AR")}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
