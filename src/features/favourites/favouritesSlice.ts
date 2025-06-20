import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavouritesState { ids: string[] }
const initialState: FavouritesState = { ids: [] }

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggle: (state: FavouritesState, action: PayloadAction<string>) => {
      const idx = state.ids.indexOf(action.payload)
      if (idx !== -1) {
        state.ids.splice(idx, 1)
      } else {
        state.ids.push(action.payload)
      }
    }
  }
})

export const { toggle } = favouritesSlice.actions
export default favouritesSlice.reducer
