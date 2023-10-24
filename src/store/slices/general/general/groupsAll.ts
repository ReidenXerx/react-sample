import { fetchGroupsNextPage } from '@action-creators/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { groupsAllSliceName } from '@store/slicesNames'
import { ReduxLoadingStates } from '@store/types'
import { Group } from 'types/entity-types'

export type GroupsAllHashWithPage = { groupsHash: GroupsAllHash; page: number }

export const defaultValue = {
  groups: { groupsHash: {}, page: 1 },
  loading: ReduxLoadingStates.succeeded,
}

export type GroupsAllHash = {
  [id: string]: Group
}

export type GroupsAllState = {
  groups: GroupsAllHashWithPage
  loading: ReduxLoadingStates
  error?: string
}

const initialState: GroupsAllState = defaultValue

export const groupsAllSlice = createSlice({
  name: groupsAllSliceName,
  initialState,
  reducers: {
    updateGroupsAllAction: (
      state: GroupsAllState,
      { payload: { groupsHash, page } }: PayloadAction<GroupsAllHashWithPage>,
    ) => {
      if (groupsHash && page) {
        state.groups = {
          groupsHash: { ...state.groups.groupsHash, ...groupsHash },
          page,
        }
      }
    },
    addGroupAllAction: (
      state: GroupsAllState,
      { payload }: PayloadAction<Group | null>,
    ) => {
      if (payload) {
        state.groups = {
          ...state.groups,
          groupsHash: {
            ...state.groups.groupsHash,
            [payload?.id]: payload,
          },
        }
      }
    },
    clearGroupsAllAction: (state: GroupsAllState) => {
      state.groups = defaultValue.groups
      state.loading = defaultValue.loading
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsNextPage.pending, (state) => {
        state.loading = ReduxLoadingStates.pending
      })
      .addCase(
        fetchGroupsNextPage.fulfilled,
        (
          state,
          {
            payload: { groupsHash, page },
          }: PayloadAction<GroupsAllHashWithPage>,
        ) => {
          state.loading = ReduxLoadingStates.succeeded
          if (Object.keys(groupsHash).length && page) {
            state.groups = {
              groupsHash: { ...state.groups.groupsHash, ...groupsHash },
              page,
            }
          }
        },
      )
      .addCase(fetchGroupsNextPage.rejected, (state, action) => {
        state.loading = ReduxLoadingStates.failed
        state.error = action.error.message
      })
  },
})

export const {
  updateGroupsAllAction,
  addGroupAllAction,
  clearGroupsAllAction,
} = groupsAllSlice.actions
