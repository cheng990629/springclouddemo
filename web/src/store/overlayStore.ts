import { create } from 'zustand'

export interface OverlayState {
  open: boolean
  route: string
  openOverlay: (initialRoute?: string) => void
  closeOverlay: () => void
  setRoute: (route: string) => void
}

export const useOverlayStore = create<OverlayState>((set) => ({
  open: false,
  route: '/',
  openOverlay: (initialRoute = '/') => set({ open: true, route: initialRoute }),
  closeOverlay: () => set({ open: false }),
  setRoute: (route: string) => set({ route }),
}))

export default useOverlayStore


