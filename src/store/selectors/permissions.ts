import { createSelector } from '@reduxjs/toolkit'
import {
  PermissionsAllHash,
  PermissionsAllHashWithPage,
  PermissionsAllState,
} from '@store/slices/general/permissionsAll'
import { PermissionRecentEditedState } from '@store/slices/recent-edited/permission-recent-edited'
import {
  permissionRecentEditedSliceName,
  permissionsAllSliceName,
} from '@store/slicesNames'
import { RootState } from '@store/store'
import createCachedSelector from 're-reselect'

export const selectPermisisonsAllHashWithPagesEntities = createSelector(
  (state: RootState) => state[permissionsAllSliceName],
  (permissionsAllState: PermissionsAllState) => permissionsAllState.permissions,
)

export const selectPermisisonsByIdEntity = createCachedSelector(
  (state: RootState) => selectPermisisonsAllHashWithPagesEntities(state),
  (_state: RootState, permissionId: string) => permissionId,
  (
    permissionsAllHashWithPage: PermissionsAllHashWithPage,
    permissionId: string,
  ) => permissionsAllHashWithPage.permissionsHash[permissionId],
)((_state, permissionId) => permissionId)

export const selectPermissionsAllCollectionEntities = createSelector(
  (state: RootState) =>
    selectPermisisonsAllHashWithPagesEntities(state).permissionsHash,
  (permissionsAllHash: PermissionsAllHash) => Object.values(permissionsAllHash),
)

export const selectPermissionsAllLoadingState = createSelector(
  (state: RootState) => state[permissionsAllSliceName],
  (permissionsAllState: PermissionsAllState) => permissionsAllState.loading,
)

export const selectPermissionsAllError = createSelector(
  (state: RootState) => state[permissionsAllSliceName],
  (permissionsAllState: PermissionsAllState) => permissionsAllState.error,
)

export const selectPermissionRecentEdited = createSelector(
  (state: RootState) => state[permissionRecentEditedSliceName],
  (permissionRecentEditedState: PermissionRecentEditedState) =>
    permissionRecentEditedState.permission,
)
