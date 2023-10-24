import {
    Action,
    ThunkAction,
    ThunkDispatch,
    configureStore,
} from '@reduxjs/toolkit'
import { groupsAllSlice } from '@store/slices/general/groupsAll'
import { permissionsAllSlice } from '@store/slices/general/permissionsAll'
import { usersAllSlice } from '@store/slices/general/usersAll'
import { useDispatch } from 'react-redux'
import { PersistStore } from './persistStore'
import { chatsSlice } from './slices/chat/allChats'
import { groupRecentEditedSlice } from './slices/recent-edited/group-recent-edited'
import { permissionRecentEditedSlice } from './slices/recent-edited/permission-recent-edited'
import userSlice from './slices/user/allData'
import { workspacesSlice } from './slices/workspaces/allWorkspaces'
  
  const persistState = await PersistStore.Get()
  
  const store = configureStore({
    reducer: {
      [usersAllSlice.name]: usersAllSlice.reducer,
      [permissionsAllSlice.name]: permissionsAllSlice.reducer,
      [groupsAllSlice.name]: groupsAllSlice.reducer,
      [workspacesSlice.name]: workspacesSlice.reducer,
      [chatsSlice.name]: chatsSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [groupRecentEditedSlice.name]: groupRecentEditedSlice.reducer,
      [permissionRecentEditedSlice.name]: permissionRecentEditedSlice.reducer,
    },
    preloadedState: persistState,
  })
  
  store.subscribe(() => {
    PersistStore.Save(store.getState())
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >
  
  export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>
  
  export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
  export default store
  