import { ChipsPanel } from '@components/chips-panel'
import { EntityCard } from '@components/entity-card'
import { EntityCardMini } from '@components/entity-card-mini'
import ModalHeader from '@components/modal-header'
import { VirtualizedTable } from '@components/virtualized-table'
import { heightForSinglePropInCardVirtualizedTable } from '@constants'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { constructComplexUrlWithParams } from 'services/router/paths'
import { capitalizeFirstLetter } from 'services/utils'
import { ManagableEntityTypes, ModalMode } from 'types/common-types'

type ManagementEditingModalProps<T extends { id: string; name: string }> = {
  open: boolean
  onClose: () => void
  chosenCollection?: Array<T>
  editingId: string
  fullCollection: Array<T>
  entityName: string
  secondaryEntityName: string
  availableModes: Array<ModalMode>
  fieldForMiniDisplaying: Array<keyof T>
  mainPath: string
  preChosenCollection: Array<T>
  setPreChosenCollection: React.Dispatch<React.SetStateAction<Array<T>>>
  fetchNextPage: () => any
}

export const ManagementEditingModal = <T extends { id: string; name: string }>({
  open,
  onClose,
  chosenCollection,
  preChosenCollection,
  setPreChosenCollection,
  editingId,
  fullCollection,
  entityName,
  secondaryEntityName,
  availableModes,
  fieldForMiniDisplaying,
  mainPath,
  fetchNextPage,
}: ManagementEditingModalProps<T>) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [modalMode, setModalMode] = useState(
    availableModes[0] ?? ModalMode.Editing,
  )

  const [selectedUnit, setSelectedUnit] = useState<T | null>(null)

  useEffect(() => {
    const managementModalMode =
      new URLSearchParams(location.search).get('managementModalMode') ??
      ModalMode.Editing
    setModalMode(managementModalMode as ModalMode)
  }, [location])

  const dataCollection = useMemo(
    () =>
      (modalMode === ModalMode.Editing || modalMode === ModalMode.Review
        ? preChosenCollection ?? []
        : fullCollection
      ).map((unit) => ({ [entityName]: unit })),
    [modalMode, preChosenCollection, fullCollection],
  )

  const preDeleteUnit = (unitId: T['id']) => {
    setSelectedUnit(null)
    setPreChosenCollection((prevPreChosenCollection) =>
      prevPreChosenCollection.filter(
        (preChosenUnit) => preChosenUnit.id !== unitId,
      ),
    )
  }

  const preAddUnit = (unitId: T['id'], unit: T) => {
    !preChosenCollection.map(({ id }) => id).includes(unitId) &&
      setPreChosenCollection((prevPreChosenCollection) => [
        ...prevPreChosenCollection,
        unit,
      ])
  }

  const onSwitchMode = () => {
    setSelectedUnit(null)

    const entityType = new URLSearchParams(location.search).get(
      'entityType',
    ) as ManagableEntityTypes

    const currentModeIndex = availableModes.indexOf(modalMode)
    const nextMode =
      availableModes[(currentModeIndex + 1) % availableModes.length]

    navigate(
      constructComplexUrlWithParams(mainPath, {
        id: editingId,
        entityType,
        managementModalMode: nextMode,
      }),
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        sx={{
          position: 'absolute',
          margin: '0 auto',
          width: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          transition: 'all 0.3s ease-in-out',
          transform: open ? 'scale(1)' : 'scale(0)',
        }}
      >
        <ModalHeader
          onClose={onClose}
          currentMode={modalMode}
          onSwitchMode={onSwitchMode}
          isDisabled={availableModes.length === 1}
        />
        <Stack sx={{ px: 4 }}>
          <Typography id="modal-title" variant="h6">
            {`${capitalizeFirstLetter(entityName)} ${
              modalMode === ModalMode.Adding
                ? 'adding'
                : modalMode === ModalMode.Review
                ? 'reviewing'
                : 'editing'
            }`}
          </Typography>
          <Typography id="modal-description" variant="body2">
            {modalMode === ModalMode.Adding
              ? `You can attach ${entityName}s to the ${secondaryEntityName}`
              : modalMode === ModalMode.Review
              ? `You can review ${entityName}s attached to the ${secondaryEntityName}`
              : `You can edit ${entityName}s attached to the ${secondaryEntityName}`}
          </Typography>
          <ChipsPanel<T>
            entityCollection={preChosenCollection}
            onDelete={
              modalMode === ModalMode.Review ? undefined : preDeleteUnit
            }
          />
        </Stack>

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          sx={{ px: 4, pb: 4 }}
        >
          <Box sx={{ width: 200, pr: 2 }}>
            <Typography variant="h3">
              {modalMode === ModalMode.Editing
                ? `${capitalizeFirstLetter(
                    secondaryEntityName,
                  )}'s ${entityName}s`
                : `${capitalizeFirstLetter(entityName)}s list`}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box>
              <VirtualizedTable<
                { [key: typeof entityName]: T },
                Record<string, never>,
                undefined,
                {
                  selectedUnit: T | null
                  preChosenCollection: Array<T>
                  chosenCollection: Array<T>
                  preDeleteUnit: (unitId: T['id']) => void
                  preAddUnit: (unitId: T['id'], unit: T) => void
                  modalMode: ModalMode
                }
              >
                dataCollection={
                  dataCollection as Array<{ [key: typeof entityName]: T }>
                }
                cellExtraProps={{
                  selectedUnit,
                  preChosenCollection,
                  chosenCollection: chosenCollection ?? [],
                  preDeleteUnit,
                  preAddUnit,
                  modalMode,
                }}
                cellRenders={{
                  [entityName]: (unit, extaProps) => {
                    const {
                      selectedUnit,
                      chosenCollection,
                      preChosenCollection,
                      preDeleteUnit,
                      preAddUnit,
                      modalMode,
                    } = extaProps ?? {}
                    const extractedUnit = unit[entityName]!
                    return (
                      <EntityCardMini<T>
                        entity={extractedUnit}
                        modalMode={modalMode ?? ModalMode.Editing}
                        selectedUnit={selectedUnit ?? undefined}
                        preChosenCollection={preChosenCollection ?? []}
                        chosenCollection={chosenCollection ?? []}
                        onClick={() => setSelectedUnit(extractedUnit ?? null)}
                        preDeleteUnit={preDeleteUnit}
                        preAddUnit={preAddUnit}
                        fieldForDisplaying={fieldForMiniDisplaying}
                      />
                    )
                  },
                }}
                columnNamesCollection={[entityName]}
                headerCellRenders={{
                  [entityName]: (columnName) =>
                    (
                      <Typography
                        fontWeight={700}
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {columnName}
                      </Typography>
                    ) as JSX.Element,
                }}
                tableProps={{
                  contentAlign: 'flex-start',
                  showHeader: false,
                  columnWidth: [500],
                  rowHeight:
                    (fieldForMiniDisplaying.length + 1) *
                      heightForSinglePropInCardVirtualizedTable +
                    100 +
                    (modalMode === ModalMode.Review ? 0 : 50),
                  color: 'text.primary',
                  backgroundColor: 'transparent',
                  inViewLimit:
                    450 /
                    ((fieldForMiniDisplaying.length + 1) *
                      heightForSinglePropInCardVirtualizedTable +
                      80 +
                      (modalMode === ModalMode.Review ? 0 : 50)),
                  header: {
                    height: 30,
                    color: 'text.primary',
                    backgroundColor: 'primary.light',
                  },
                }}
                dynamicLoadingFetching={{
                  fetchNextPage,
                  chunkSize: 1,
                  initialLoadingSizeChunks: 1,
                }}
              />
            </Box>
          </Box>

          {!!selectedUnit && <EntityCard<T> entity={selectedUnit} />}
        </Box>
      </Box>
    </Modal>
  )
}
