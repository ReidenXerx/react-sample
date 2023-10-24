import {
  createWorkspace,
  deleteWorkspace,
  fetchWorkspaces,
} from '@action-creators/workspaces'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getSelectedWorkspace,
  selectAllWorkspaces,
} from '@store/selectors/workspaces'
import {
  clearWorkspacesAction,
  setSelectedWorkspaceAction,
} from '@store/slices/workspaces/allWorkspaces'
import { useAppDispatch } from '@store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { paths } from 'services/router/paths'
import { Workspace } from 'types/entity-types'

export const useWorkspaces = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedWorkSpace: Workspace | undefined =
    useSelector(getSelectedWorkspace)
  const workspaces: Workspace[] = useSelector(selectAllWorkspaces)

  const onSelectWorkspace = (id: string) => {
    dispatch(setSelectedWorkspaceAction({ id }))
  }

  const onClearWorkspaces = () => {
    dispatch(clearWorkspacesAction())
  }

  const onRemoveWorkspace = (id: string) => {
    dispatch(deleteWorkspace(id))
  }

  const fetchAllWorkspaces = () => {
    dispatch(fetchWorkspaces())
  }

  const onCreateWorkspace = async (data: {
    name: string
    description: string
  }) => {
    const response = (await dispatch(createWorkspace(data))) as PayloadAction<{
      workspace: Array<Workspace>
    }>
    if (!!response?.payload.workspace) {
      navigate(paths.workspaces)
    }
  }

  return {
    workspaces,
    selectedWorkSpace,
    onSelectWorkspace,
    onClearWorkspaces,
    onRemoveWorkspace,
    onCreateWorkspace,
    fetchAllWorkspaces,
  }
}
