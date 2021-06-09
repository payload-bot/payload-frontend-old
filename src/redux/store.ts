import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

// Slices
import userSlice from './users/userSlice'

const store = configureStore({
  reducer: {
    users: userSlice,
  },
  devTools: process.env.NEXT_PUBLIC_ENV === 'production' ? false : true,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
