import { create } from "zustand";

export const useEquipoStore = create((set, get) => ({
//Estado inicial
  equipo: [],

  //Funciones

  //Agregamos un equipo a la lista de favoritos
  agregarFavorito: (nuevoEquipo) => set ((state) => {
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
  eliminarFavorito: (equipo) => set ((state) => {
    //filtramos el array para eliminar el equipo
    return { equipo: state.equipo.filter((e) => e.id !== equipo.id) };
  }),

  //Vaciamos la lista de favoritos
  vaciarFavoritos:()=> set({ equipo: [] }),

  //Buscamos un equipo en la lista de favoritos
  //(solo lee: devuelve el equipo o undefined, sin modificar la lista)
  buscarFavorito: (equipoId) => get().equipo.find((equipo) => equipo.id === equipoId),

  //Obtenemos la lista de favoritos
  obtenerFavoritos: () => get().equipo,
}));
 