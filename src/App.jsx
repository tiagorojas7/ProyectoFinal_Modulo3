import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CompetenciasPage } from "./pages/CompetenciasPage"
import { EquipoPage } from "./pages/EquipoPage"
import { LigaPage } from "./pages/LigaPage"

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompetenciasPage />} />
        <Route path="/posiciones/:competenciaId" element={<LigaPage />} />
        <Route path="/equipo/:equipoId" element={<EquipoPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
