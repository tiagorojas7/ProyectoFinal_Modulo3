import { Button, Container, Typography } from "@mui/material";
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
  const jugados = useFetch(`${API}/${id}/matches?status=FINISHED`);
  const proximos = useFetch(`${API}/${id}/matches?status=SCHEDULED`);

  const favorito = useEquipoStore((state) => state.buscarFavorito(id));
  const agregarFavorito = useEquipoStore((state) => state.agregarFavorito);
  const eliminarFavorito = useEquipoStore((state) => state.eliminarFavorito);

  const cargando = equipo.loading || jugados.loading || proximos.loading;
  const error = equipo.error || jugados.error || proximos.error;

  return (
    <>
      <Header />
      <Container sx={{ py: 3 }}>
        {cargando && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}

        {!cargando && !error && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {equipo.data.name}
            </Typography>

            {favorito ? (
              <Button onClick={() => eliminarFavorito(favorito)}>Quitar de favoritos</Button>
            ) : (
              <Button onClick={() => agregarFavorito({ id, nombre: equipo.data.name })}>
                Agregar a favoritos
              </Button>
            )}

            <ListaPartidos
              titulo="Próximos partidos"
              partidos={proximos.data.matches?.slice(0, 10)}
            />
            <ListaPartidos
              titulo="Historial"
              partidos={jugados.data.matches?.slice(-10)}
            />
          </>
        )}
      </Container>
    </>
  );
};
