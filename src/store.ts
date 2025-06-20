import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { coopleApi } from './services/coopleApi'
import favouritesReducer from './features/favourites/favouritesSlice'

const rootReducer = combineReducers({
  [coopleApi.reducerPath]: coopleApi.reducer,
  favourites: favouritesReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favourites']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(coopleApi.middleware)
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
