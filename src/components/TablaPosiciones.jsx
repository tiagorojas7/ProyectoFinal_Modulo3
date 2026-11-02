import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// Recibe las filas de la tabla (standings[0].table de la API) y avisa qué equipo se eligió
export const TablaPosiciones = ({ tabla = [], onEquipoClick }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Equipo</TableCell>
          <TableCell align="right">PJ</TableCell>
          <TableCell align="right">G</TableCell>
          <TableCell align="right">E</TableCell>
          <TableCell align="right">P</TableCell>
          <TableCell align="right">Pts</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tabla.map((fila) => (
          <TableRow
            key={fila.team.id}
            hover
            onClick={() => onEquipoClick(fila.team.id)}
            sx={{ cursor: "pointer" }}
          >
            <TableCell>{fila.position}</TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={fila.team.crestURI}
                  alt={fila.team.name}
                  variant="square"
                  sx={{ width: 24, height: 24, bgcolor: "transparent" }}
                />
                {fila.team.name}
              </Box>
            </TableCell>
            <TableCell align="right">{fila.playedGames}</TableCell>
            <TableCell align="right">{fila.won}</TableCell>
            <TableCell align="right">{fila.draw}</TableCell>
            <TableCell align="right">{fila.lost}</TableCell>
            <TableCell align="right">{fila.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
