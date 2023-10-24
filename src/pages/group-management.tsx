import {
  actualizeGroupApp,
  fetchGroupsNextPage,
  fetchPermissionsNextPage,
  fetchUsersNextPage,
} from '@action-creators/common'
import { ButtonTransparent } from '@components/button-transparent'
import { ManageGroupModalForm } from '@components/forms/add-group-form'
import {
  GroupManagementsActions,
  groupsManagementsActionsDataId,
} from '@components/group-management-feature/group-management-actions'
import { GroupManagementPrimaryFeatureBadge } from '@components/group-management-feature/group-management-primary-badge'
import { GroupManagementSecondaryFeatureBadge } from '@components/group-management-feature/group-management-secondary-badge'
import { sidebarWidth } from '@components/main'
import { ManagementEditingModal } from '@components/modals/management-modal'
import { searchBoxTextFieldPresets } from '@components/searchBox/presets'
import { SearchField } from '@components/searchfield'
import { VirtualizedTable } from '@components/virtualized-table'
import { useViewport } from '@hooks/use-viewport'
import { useWorkspaces } from '@hooks/use-workspaces'
import { AddOutlined } from '@mui/icons-material'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import {
  selectGroupRecentEdited,
  selectGroupsAllCollectionEntities,
  selectPermisisonsByGroupIdEntities,
  selectUsersByGroupIdEntities,
} from '@store/selectors/groups'
import { selectPermissionsAllCollectionEntities } from '@store/selectors/permissions'
import { selectUsersAllCollectionEntities } from '@store/selectors/users'
import { addGroupAllAction } from '@store/slices/general/groupsAll'
import { AppDispatch, RootState } from '@store/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {
  setPermissionsToGroupRequest,
  setUsersToGroupRequest,
} from 'services/request-creators/common'
import { constructComplexUrlWithParams, paths } from 'services/router/paths'
import { computeCollectionsDifferences, isDescendantOf } from 'services/utils'
import { ManagableEntityTypes, ModalMode } from 'types/common-types'
import { Group, Permission, User } from 'types/entity-types'

const paddingX = 30

const GroupManagementPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()

  const { selectedWorkSpace } = useWorkspaces()

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null)

  const permissionsForEditingGroupId = useSelector<
    RootState,
    Array<Permission>
  >((state) => selectPermisisonsByGroupIdEntities(state, editingGroupId ?? ''))

  const usersForEditingGroupId = useSelector<RootState, Array<User>>((state) =>
    selectUsersByGroupIdEntities(state, editingGroupId ?? ''),
  )

  const [editingEntityType, setEditingEntityType] =
    useState<ManagableEntityTypes | null>(null)

  const [preChosenPermissionCollection, setPreChosenPermissionCollection] =
    useState<Array<Permission>>(permissionsForEditingGroupId)

  const [preChosenUsersCollection, setPreChosenUsersCollection] = useState<
    Array<User>
  >(usersForEditingGroupId)

  useEffect(() => {
    setPreChosenUsersCollection(usersForEditingGroupId)
  }, [usersForEditingGroupId])

  useEffect(() => {
    setPreChosenPermissionCollection(permissionsForEditingGroupId)
  }, [permissionsForEditingGroupId])

  const groupRecentEdited = useSelector<RootState, Group>(
    selectGroupRecentEdited,
  )

  const usersAllCollection = useSelector<RootState, Array<User>>(
    selectUsersAllCollectionEntities,
  )

  const groupAllCollection = useSelector<RootState, Array<Group>>(
    selectGroupsAllCollectionEntities,
  )

  const permissionAllCollection = useSelector<RootState, Array<Permission>>(
    selectPermissionsAllCollectionEntities,
  )

  const { width: viewportWidth, height: viewportHeight } = useViewport()

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('id')
    const entityType = new URLSearchParams(location.search).get(
      'entityType',
    ) as ManagableEntityTypes
    setEditingEntityType(entityType)
    setEditingGroupId(id)
  }, [location])

  const handleCloseIsEditingModal = () => {
    if (
      editingEntityType === ManagableEntityTypes.user &&
      selectedWorkSpace?.id &&
      editingGroupId
    ) {
      const { toAdd, toDelete } = computeCollectionsDifferences<User>(
        usersForEditingGroupId,
        preChosenUsersCollection,
        ({ id }) => id,
      )
      setUsersToGroupRequest(
        selectedWorkSpace?.id,
        editingGroupId,
        toAdd,
        toDelete,
      )
    }

    if (
      editingEntityType === ManagableEntityTypes.permission &&
      selectedWorkSpace?.id &&
      editingGroupId
    ) {
      const { toAdd, toDelete } = computeCollectionsDifferences<Permission>(
        permissionsForEditingGroupId,
        preChosenPermissionCollection,
        ({ id }) => id,
      )
      setPermissionsToGroupRequest(
        selectedWorkSpace?.id,
        editingGroupId,
        toAdd,
        toDelete,
      )
    }
    dispatch(actualizeGroupApp())
    navigate(paths.groupManagement)
  }

  const fetchUsersNextPageHandler = () => dispatch(fetchUsersNextPage())

  const fetchGroupsNextPageHandler = () => dispatch(fetchGroupsNextPage())

  const fetchPermissionsNextPageHandler = () =>
    dispatch(fetchPermissionsNextPage())

  const virtualizedTableOnClickRow = ({ id }: Group, event: MouseEvent) => {
    const blackListElement = document.querySelector(
      `[data-id="${groupsManagementsActionsDataId}"]`,
    )
    if (
      blackListElement &&
      !isDescendantOf(
        event.target as HTMLElement,
        blackListElement as HTMLElement,
      )
    ) {
      navigate(
        constructComplexUrlWithParams(paths.groupManagement, {
          id,
          entityType: ManagableEntityTypes.user,
          managementModalMode: ModalMode.Editing,
        }),
      )
    }
  }

  return (
    <Grid container display={'flex'} pl={1}>
      <Grid item xs={12} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={5}>
            <GroupManagementPrimaryFeatureBadge />
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <GroupManagementSecondaryFeatureBadge group={groupRecentEdited} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} py={2} px={2}>
        <Grid
          container
          spacing={2}
          sx={{ background: 'white', borderRadius: '10px' }}
        >
          <Box display={'flex'} py={'15px'} px={`${paddingX}px`} gap={4}>
            <Typography
              display={'flex'}
              variant="h4"
              alignItems={'center'}
              sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            >
              Groups list
            </Typography>
            <Typography
              display={'flex'}
              variant="h4"
              alignItems={'center'}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Groups which registered in your system
            </Typography>
            <SearchField
              preset={searchBoxTextFieldPresets.minimal}
              backgroundColor={theme.palette.accentOlive.light}
            />
            <ButtonTransparent
              icon={<AddOutlined />}
              primary="Add group"
              width={'235px'}
              onClick={() =>
                navigate(
                  constructComplexUrlWithParams(paths.groupManagement, {
                    entityType: ManagableEntityTypes.group,
                    managementModalMode: ModalMode.Adding,
                  }),
                )
              }
            />
          </Box>
          <VirtualizedTable<Group, { actions?: unknown }>
            dataCollection={groupAllCollection}
            onClickRow={virtualizedTableOnClickRow}
            cellRenders={{
              name: ({ name }) => (
                <Typography variant="body1">{name}</Typography>
              ),
              users: ({ users }) => (
                <Typography variant="body1">{users.length}</Typography>
              ),
              permissions: ({ permissions }) => (
                <Typography variant="body1">{permissions.length}</Typography>
              ),
              actions: ({ id }) => <GroupManagementsActions id={id} />,
            }}
            columnNamesCollection={['name', 'users', 'permissions', 'actions']}
            headerCellRenders={[
              'name',
              'users',
              'permissions',
              'actions',
            ].reduce(
              (acc, columnName) => ({
                ...acc,
                [columnName]: (columnName: string) =>
                  (
                    <Typography
                      fontWeight={700}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {columnName}
                    </Typography>
                  ) as JSX.Element,
              }),
              {},
            )}
            tableProps={{
              columnWidth: [
                (viewportWidth - sidebarWidth - 10) * 0.25,
                (viewportWidth - sidebarWidth - 10) * 0.25,
                (viewportWidth - sidebarWidth - 10) * 0.25,
                (viewportWidth - sidebarWidth - 10) * 0.25,
              ],
              rowHeight: 70,
              color: theme.palette.text.primary,
              backgroundColor: 'transparent',
              inViewLimit: viewportHeight > 800 ? 5 : 4,
              header: {
                height: 30,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.light,
              },
            }}
            dynamicLoadingFetching={{
              fetchNextPage: fetchGroupsNextPageHandler,
              chunkSize: 1,
              initialLoadingSizeChunks: 2,
            }}
          />
        </Grid>
      </Grid>
      {editingEntityType === ManagableEntityTypes.group && (
        <ManageGroupModalForm
          open={editingEntityType === ManagableEntityTypes.group}
          onSubmit={(newValue: Group) => {
            dispatch(addGroupAllAction(newValue))
            navigate(paths.groupManagement)
            setEditingGroupId(null)
          }}
          onClose={() => navigate(paths.groupManagement)}
        />
      )}
      {editingGroupId &&
        (editingEntityType === ManagableEntityTypes.permission ? (
          <ManagementEditingModal<Permission>
            editingId={editingGroupId}
            open={!!editingGroupId}
            onClose={handleCloseIsEditingModal}
            chosenCollection={permissionsForEditingGroupId}
            entityName="permission"
            secondaryEntityName="Group"
            fullCollection={permissionAllCollection}
            availableModes={[
              ModalMode.Review,
              ModalMode.Adding,
              ModalMode.Editing,
            ]}
            fieldForMiniDisplaying={['description', 'type']}
            mainPath={paths.groupManagement}
            preChosenCollection={preChosenPermissionCollection}
            setPreChosenCollection={setPreChosenPermissionCollection}
            fetchNextPage={fetchPermissionsNextPageHandler}
          />
        ) : (
          <ManagementEditingModal<User>
            editingId={editingGroupId}
            open={!!editingGroupId}
            onClose={handleCloseIsEditingModal}
            chosenCollection={usersForEditingGroupId}
            entityName="user"
            secondaryEntityName="Group"
            fullCollection={usersAllCollection}
            availableModes={[
              ModalMode.Review,
              ModalMode.Adding,
              ModalMode.Editing,
            ]}
            fieldForMiniDisplaying={['role', 'email']}
            mainPath={paths.groupManagement}
            preChosenCollection={preChosenUsersCollection}
            setPreChosenCollection={setPreChosenUsersCollection}
            fetchNextPage={fetchUsersNextPageHandler}
          />
        ))}
    </Grid>
  )
}

export default GroupManagementPage
