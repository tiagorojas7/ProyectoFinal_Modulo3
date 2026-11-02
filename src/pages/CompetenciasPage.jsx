import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ListadoCompetencias } from "../components/ListadoCompetencias";
import { useEquipoStore } from "../store/equipoStore";

// Página 1: todas las competencias + equipos favoritos guardados en el store
export const CompetenciasPage = () => {
  const navigate = useNavigate();
  const favoritos = useEquipoStore((state) => state.obtenerFavoritos());
  const eliminarFavorito = useEquipoStore((state) => state.eliminarFavorito);
  const vaciarFavoritos = useEquipoStore((state) => state.vaciarFavoritos);

  return (
    <>
      <Header />
      <Container sx={{ py: 3 }}>
        {favoritos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Equipos favoritos
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
              {favoritos.map((favorito) => (
                <Chip
                  key={favorito.id}
                  label={favorito.nombre}
                  onClick={() => navigate(`/equipo/${favorito.id}`)}
                  onDelete={() => eliminarFavorito(favorito)}
                />
              ))}
              <Button size="small" color="error" onClick={vaciarFavoritos}>
                Vaciar favoritos
              </Button>
            </Box>
          </Box>
        )}

        <ListadoCompetencias />
      </Container>
    </>
  );
};
