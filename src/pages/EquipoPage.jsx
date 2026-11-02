import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ListaPartidos } from "../components/ListaPartidos";
import { useFetch } from "../hooks/useFetch";
import { useEquipoStore } from "../store/equipoStore";

const API = "/api-futbol/teams";

// Página 3: datos del equipo, próximos partidos e historial
export const EquipoPage = () => {
  const { equipoId } = useParams();
  const id = Number(equipoId);

  const equipo = useFetch(`${API}/${id}`);
  // La API ignora el filtro status en este endpoint, así que pedimos todo y filtramos acá
  const partidos = useFetch(`${API}/${id}/matches`);

  const favorito = useEquipoStore((state) => state.buscarFavorito(id));
  const agregarFavorito = useEquipoStore((state) => state.agregarFavorito);
  const eliminarFavorito = useEquipoStore((state) => state.eliminarFavorito);

  const cargando = equipo.loading || partidos.loading;
  const error = equipo.error || partidos.error;

  // La API envuelve cada partido en { match } y los manda del más nuevo al más viejo
  const todos = (partidos.data.matches ?? []).map((item) => item.match);
  const historial = todos.filter((partido) => partido.status === "finished").slice(0, 10);
  const proximos = todos.filter((partido) => partido.status === "scheduled").reverse().slice(0, 10);

  return (
    <>
      <Header />
      <Container sx={{ py: 3 }}>
        {cargando && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}

        {!cargando && !error && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Avatar
                src={equipo.data.crestUrl}
                alt={equipo.data.name}
                variant="square"
                sx={{ width: 64, height: 64, bgcolor: "transparent" }}
              />
              <Typography variant="h4" component="h1">
                {equipo.data.name}
              </Typography>
            </Box>

            {favorito ? (
              <Button onClick={() => eliminarFavorito(favorito)}>Quitar de favoritos</Button>
            ) : (
              <Button onClick={() => agregarFavorito({ id, nombre: equipo.data.name })}>
                Agregar a favoritos
              </Button>
            )}

            <ListaPartidos titulo="Próximos partidos" partidos={proximos} />
            <ListaPartidos titulo="Historial" partidos={historial} />
          </>
        )}
      </Container>
    </>
  );
};
