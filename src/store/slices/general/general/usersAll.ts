import { fetchUsersNextPage } from '@action-creators/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { usersAllSliceName } from '@store/slicesNames'
import { ReduxLoadingStates } from '@store/types'
import { User } from 'types/entity-types'

export type UsersAllHashWithPage = { usersHash: UsersAllHash; page: number }

export const defaultValue = {
  users: {
    usersHash: {},
    page: 1,
  },
  loading: ReduxLoadingStates.succeeded,
}

export type UsersAllHash = {
  [id: string]: User
}

export type UsersAllState = {
  users: UsersAllHashWithPage
  loading: ReduxLoadingStates
  error?: string
}

const initialState: UsersAllState = defaultValue

export const usersAllSlice = createSlice({
  name: usersAllSliceName,
  initialState,
  reducers: {
    addUsersAllAction: (
      state: UsersAllState,
      { payload: { usersHash, page } }: PayloadAction<UsersAllHashWithPage>,
    ) => {
      if (usersHash && page) {
        state.users = {
          usersHash: { ...state.users.usersHash, ...usersHash },
          page,
        }
      }
    },
    clearUsersAllAction: (state: UsersAllState) => {
      state.users = defaultValue.users
      state.loading = defaultValue.loading
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersNextPage.pending, (state) => {
        state.loading = ReduxLoadingStates.pending
      })
      .addCase(
        fetchUsersNextPage.fulfilled,
        (
          state,
          { payload: { usersHash, page } }: PayloadAction<UsersAllHashWithPage>,
        ) => {
          state.loading = ReduxLoadingStates.succeeded
          if (Object.keys(usersHash).length && page) {
            state.users = {
              usersHash: { ...state.users.usersHash, ...usersHash },
              page,
            }
          }
        },
      )
      .addCase(fetchUsersNextPage.rejected, (state, action) => {
        state.loading = ReduxLoadingStates.failed
        state.error = action.error.message
      })
  },
})

export const { addUsersAllAction, clearUsersAllAction } = usersAllSlice.actions

export default usersAllSlice
