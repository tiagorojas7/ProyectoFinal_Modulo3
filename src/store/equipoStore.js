import { create } from "zustand";

export const useEquipoStore = create((set) => ({
//Estado inicial
  equipo: [],

  //Funciones

  //Agregamos un equipo a la lista de favoritos
  agregarEquipo: (nuevoEquipo) => set ((state) => {
    //verificamos si el equipo ya se agrego como favorito
    const equipoExistente = state.equipo.find((equipo) => equipo.id === nuevoEquipo.id);
    if (equipoExistente) {
      //si ya existe, no hacemos nada
      return state;
    } else {
      //si no existe, agregamos el nuevo equipo al array
      return { equipo: [...state.equipo, nuevoEquipo] };
    }
  }),

  //Eliminamos un equipo de la lista de favoritos
  eliminarEquipo: (equipo) => set ((state) => {
    //filtramos el array para eliminar el equipo
    return { equipo: state.equipo.filter((e) => e.id !== equipo.id) };
  }),

  //Vaciamos la lista de favoritos
  vaciarEquipos:()=> set({ equipo: [] }),

  //Buscamos un equipo en la lista de favoritos
  buscarEquipo: (equipoId) => set((state) => {
    const equipoEncontrado = state.equipo.find((equipo) => equipo.id === equipoId);
    return { equipo: equipoEncontrado ? [equipoEncontrado] : [] };
  }),

  //Obtenemos la lista de favoritos
  obtenerEquipos: () => set((state) => {
    return { equipo: state.equipo };
  }),
}));
 