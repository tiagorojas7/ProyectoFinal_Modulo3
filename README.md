PROYECTO FINAL - MODULO 3
Aplicación de fútbol con React

DESCRIPCIÓN
Aplicación web hecha con React que consume la API de football-data.org
(https://www.football-data.org/documentation/quickstart). Tiene tres páginas:

  1. Competencias: lista de todas las ligas disponibles.
  2. Liga: tabla de posiciones y próximos partidos de la liga elegida.
  3. Equipo: escudo, próximos partidos e historial del equipo elegido,
     con la opción de agregarlo o quitarlo de favoritos.

Los equipos favoritos se muestran en la página de competencias.

TECNOLOGÍAS
- React 19 + Vite
- Material UI (@mui/material) para los componentes y el tema
- React Router (react-router-dom) para la navegación entre páginas
- Zustand para el estado global de los equipos favoritos

CÓMO EJECUTARLO
1. Instalar dependencias:   npm install
2. Colocar tu token de football-data.org en el header "X-Auth-Token" de
   vite.config.js (se obtiene gratis registrándose en la web de la API).
3. Iniciar el servidor:     npm run dev
4. Abrir http://localhost:5173

Importante: el pedido a la API pasa por el proxy "/api-futbol" definido en
vite.config.js, por lo que la app solo funciona con el servidor de Vite.
El plan gratuito de la API permite 10 pedidos por minuto; si se supera,
aparece el error 429 (esperar un minuto).

ESTRUCTURA DEL PROYECTO
Se trabajó con modularización: componentes reutilizables, páginas que los
combinan y estilos en una carpeta aparte.

src/
  main.jsx
    Punto de entrada. Renderiza la app dentro del ThemeProvider de
    Material UI y aplica CssBaseline.

  App.jsx
    Define las rutas de la aplicación:
      /                              -> CompetenciasPage
      /posiciones/:competenciaId     -> LigaPage
      /equipo/:equipoId              -> EquipoPage

  components/   (componentes reutilizables)
    Header.jsx
      Barra superior (AppBar) con el título y el acceso a Competencias.
    ListadoCompetencias.jsx
      Lista las competencias con su escudo y un enlace a sus estadísticas.
    TablaPosiciones.jsx
      Tabla de posiciones (puesto, escudo, equipo, PJ, G, E, P, Pts).
      Al hacer clic en un equipo avisa cuál se eligió.
    ListaPartidos.jsx
      Lista de partidos con fecha y resultado (o "vs" si no se jugó).
      Se reutiliza en la página de liga y en la de equipo.

  pages/   (páginas que se renderizan desde App.jsx)
    CompetenciasPage.jsx
      Muestra el Header, los equipos favoritos (con opción de quitarlos o
      vaciar la lista) y el listado de competencias.
    LigaPage.jsx
      Pide a la API las posiciones y los próximos partidos de la liga.
    EquipoPage.jsx
      Pide a la API los datos del equipo y sus partidos; separa próximos
      partidos e historial, y permite agregar o quitar de favoritos.

  hooks/
    useFetch.js
      Hook personalizado para consultar la API. Maneja los estados de
      carga y error, y guarda las respuestas en una caché para no repetir
      pedidos (evita el error 429 por exceso de peticiones).

  store/
    equipoStore.js
      Store de Zustand con los equipos favoritos: agregarFavorito,
      eliminarFavorito, vaciarFavoritos, buscarFavorito y obtenerFavoritos.
      Los favoritos se guardan en memoria: se pierden al recargar la página.

  styles/
    theme.js
      Tema de Material UI: colores (verde y naranja), fondo, botones y
      encabezados de tabla.

vite.config.js
  Configuración de Vite y proxy hacia la API de football-data.org.

TRABAJO REALIZADO
- Estructura modular del proyecto (components, pages, hooks, store, styles).
- Consumo de la API con un hook propio y manejo de carga y errores.
- Tres páginas con navegación mediante React Router y parámetros en la URL.
- Estado global de favoritos con Zustand.
- Interfaz con Material UI y un tema propio en una carpeta de estilos.
- Corrección de problemas encontrados al probar con datos reales: formato
  de respuesta de la API (cada partido viene dentro de un objeto "match"),
  filtro de estado ignorado en los partidos de un equipo, tablas vacías en
  algunas competiciones (como el Mundial), error 429 por exceso de pedidos
  y recarga completa de la página al borrar un favorito.

USO DE INTELIGENCIA ARTIFICIAL
Para mejorar el proyecto se trabajó con una IA (Claude Code, de Anthropic)
de forma interactiva. La IA ayudó a:
- Proponer y escribir los componentes (Header, TablaPosiciones,
  ListaPartidos), las tres páginas, el tema de estilos y las rutas.
- Revisar el store de Zustand: buscarFavorito reemplazaba toda la lista de
  favoritos al buscar, y se corrigió para que solo lea.
- Detectar y corregir errores al probar contra la API real, agregar la caché
  en useFetch y arreglar el borrado de favoritos.
- Simplificar el código a pedido, priorizando que fuera fácil de leer.

Las decisiones de diseño y el alcance del proyecto fueron definidos por el
autor, y el código generado fue revisado y probado durante el desarrollo.
