import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListadoCompetencias } from "./components/ListadoCompetencias"

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListadoCompetencias />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
