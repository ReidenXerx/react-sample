import { fetchPermissionsNextPage } from '@action-creators/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { permissionsAllSliceName } from '@store/slicesNames'
import { ReduxLoadingStates } from '@store/types'
import { Permission } from 'types/entity-types'

// export const defaultValue = { permissions: {}, loading: ReduxLoadingStates.idle }
export type PermissionsAllHashWithPage = {
  permissionsHash: PermissionsAllHash
  page: number
}

export const defaultValue = {
  permissions: {
    permissionsHash: {},
    page: 1,
  },
  loading: ReduxLoadingStates.succeeded,
}

export type PermissionsAllHash = {
  [id: string]: Permission
}

export type PermissionsAllState = {
  permissions: PermissionsAllHashWithPage
  loading: ReduxLoadingStates
  error?: string
}

const initialState: PermissionsAllState = defaultValue

export const permissionsAllSlice = createSlice({
  name: permissionsAllSliceName,
  initialState,
  reducers: {
    updatePermissionsAllAction: (
      state: PermissionsAllState,
      { payload }: PayloadAction<PermissionsAllHash | null>,
    ) => {
      if (payload) {
        state.permissions = { ...state.permissions, ...payload }
      }
    },
    addPermissionAllAction: (
      state: PermissionsAllState,
      { payload }: PayloadAction<Permission | null>,
    ) => {
      if (payload) {
        state.permissions = {
          ...state.permissions,
          permissionsHash: {
            ...state.permissions.permissionsHash,
            [payload?.id]: payload,
          },
        }
      }
    },
    clearPermissionsAllAction: (state: PermissionsAllState) => {
      state.permissions = defaultValue.permissions
      state.loading = defaultValue.loading
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissionsNextPage.pending, (state) => {
        state.loading = ReduxLoadingStates.pending
      })
      .addCase(
        fetchPermissionsNextPage.fulfilled,
        (
          state,
          {
            payload: { permissionsHash, page },
          }: PayloadAction<PermissionsAllHashWithPage>,
        ) => {
          state.loading = ReduxLoadingStates.succeeded
          if (Object.keys(permissionsHash).length && page) {
            state.permissions = {
              permissionsHash: {
                ...state.permissions.permissionsHash,
                ...permissionsHash,
              },
              page,
            }
          }
        },
      )
      .addCase(fetchPermissionsNextPage.rejected, (state, action) => {
        state.loading = ReduxLoadingStates.failed
        state.error = action.error.message
      })
  },
})

export const {
  updatePermissionsAllAction,
  addPermissionAllAction,
  clearPermissionsAllAction,
} = permissionsAllSlice.actions
