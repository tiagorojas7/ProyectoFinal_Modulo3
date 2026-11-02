// Función serverless de Vercel: hace de proxy hacia football-data.org y agrega el token
// desde la variable de entorno FOOTBALL_DATA_TOKEN (el navegador nunca lo ve).
// En desarrollo esto lo hace el proxy de vite.config.js.
export default async function handler(req, res) {
  if (!process.env.FOOTBALL_DATA_TOKEN) {
    return res.status(500).json({ message: "Falta la variable de entorno FOOTBALL_DATA_TOKEN" });
  }

  // vercel.json reescribe /api-futbol/<ruta> a /api/futbol?path=<ruta>, y conserva el resto de la query (ej: status)
  const { path, ...params } = req.query;
  const consulta = new URLSearchParams(params).toString();
  const url = `https://api.football-data.org/v2/${path}${consulta ? `?${consulta}` : ""}`;

  const respuesta = await fetch(url, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN },
  });

  res.status(respuesta.status).setHeader("Content-Type", "application/json");
  res.send(await respuesta.text());
}
