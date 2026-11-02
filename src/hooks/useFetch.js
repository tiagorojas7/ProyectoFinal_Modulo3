import { useEffect, useState } from "react";

// Guardamos los pedidos ya hechos para no repetirlos (el plan gratuito de la API permite 10 por minuto)
const cache = new Map();

const pedir = (url) => {
  if (!cache.has(url)) {
    const pedido = fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
    cache.set(url, pedido);
    // Si falla, lo sacamos del cache para poder reintentar
    pedido.catch(() => cache.delete(url));
  }
  return cache.get(url);
};

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const json = await pedir(url);
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
