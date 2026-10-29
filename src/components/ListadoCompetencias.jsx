import { useFetch } from "../hooks/useFetch";
import { useEquipoStore } from "../store/equipoStore.js";
import { Link } from "react-router-dom";

const API = "/api-futbol/competitions";

export const ListadoCompetencias = () => {
    const { data: competencias, loading, error } = useFetch(API);
    const verFavoritos = useEquipoStore((state) => state.verFavoritos);
    const agregarFavorito = useEquipoStore((state) => state.agregarFavorito);
    
 if(loading) return <p>Cargando...</p>;
 if(error) return <p>Error: {error.message}</p>;

  const competenciasConImagen = competencias?.competitions?.filter(
    (competencia) => Boolean(competencia.emblemUrl)
  ) ?? [];

  if (competenciasConImagen.length === 0 && !loading && !error) {
    return <p>No hay competencias con imagen disponible.</p>;
  }

  return (
    <div>
      <h1>Todas las competencias</h1>
      <ul>
        {competenciasConImagen.map((competencia) => (
          <li key={competencia.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <img
              src={competencia.emblemUrl}
              alt={competencia.name}
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <span>{competencia.name}</span>
            <Link to={`/posiciones/${competencia.id}`}>Ver estadísticas</Link>
            <button onClick={() => agregarFavorito({id: competencia.id, nombre: competencia.name})}>Agregar a Favoritos</button>
          </li>
        ))}
      </ul>
      <Link to="/favoritos">Ver competencias favoritas</Link>
    </div>
  );
};