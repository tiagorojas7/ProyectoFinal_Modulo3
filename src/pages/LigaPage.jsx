import { Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ListaPartidos } from "../components/ListaPartidos";
import { TablaPosiciones } from "../components/TablaPosiciones";
import { useFetch } from "../hooks/useFetch";

const API = "/api-futbol/competitions";

// Página 2: posiciones y próximos partidos de la liga elegida
export const LigaPage = () => {
  const { competenciaId } = useParams();
  const navigate = useNavigate();

  const posiciones = useFetch(`${API}/${competenciaId}/standings`);
  const partidos = useFetch(`${API}/${competenciaId}/matches?status=SCHEDULED`);

  const cargando = posiciones.loading || partidos.loading;
  const error = posiciones.error || partidos.error;

  // La API envuelve cada partido en { match } y los manda del más nuevo al más viejo
  const todos = (partidos.data.matches ?? []).map((item) => item.match);
  const proximos = todos.reverse().slice(0, 10);
  const tabla = posiciones.data.standings?.[0]?.table ?? [];

  return (
    <>
      <Header />
      <Container sx={{ py: 3 }}>
        {cargando && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}

        {!cargando && !error && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {todos[0]?.competition.name ?? "Posiciones"}
            </Typography>

            {tabla.length === 0 ? (
              <Typography>No hay posiciones disponibles para esta competición.</Typography>
            ) : (
              <TablaPosiciones
                tabla={tabla}
                onEquipoClick={(equipoId) => navigate(`/equipo/${equipoId}`)}
              />
            )}

            <ListaPartidos
              titulo="Próximos partidos"
              partidos={proximos}
            />
          </>
        )}
      </Container>
    </>
  );
};
