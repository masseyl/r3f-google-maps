/* eslint-disable array-callback-return */
import create from "zustand"
export interface MainState {
  google: any
  map: any
  meshesArray: any
  mapCenter: any
  _id: string
  ADD_MESH: (payload: any) => void
  SET_GOOGLE_API: (payload: any) => void
  SET_GOOGLE_MAP: (payload: any) => void
  SET_MAP_CENTER: (payload: any) => void
}
const useZusStore = create<MainState>((set) => ({
  _id: "",
  meshesArray: [],
  mapCenter: [],
  google: null,
  map: null,
  SET_GOOGLE_API: (payload) => set((state) => ({ google: payload })),
  SET_GOOGLE_MAP: (payload) => set((state) => ({ map: payload })),
  SET_MAP_CENTER: (payload) => set((state) => ({ mapCenter: payload })),
  ADD_MESH: (payload) => {
    return set((state) => {
      const apts = state.meshesArray
      apts.push({payload})
      return {
        meshesArray: apts,
      }
    })
  },
}))
export default useZusStore
