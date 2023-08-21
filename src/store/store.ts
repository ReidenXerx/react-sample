import { configureStore } from '@reduxjs/toolkit'
import { somethingSlice } from '@store/slices/general/something'


const persistState = await PersistStore.Get();

const store = configureStore({
    reducer: {
       [somethingSlice.name]: somethingSlice.reducer,
    },
    preloadedState: persistState,
});

store.subscribe(() => {
    PersistStore.Save(store.getState())
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store