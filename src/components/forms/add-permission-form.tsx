import { Button } from '@components/button'
import ModalHeaderSimple from '@components/modal-header-simple'
import { SequentalFormConstructor } from '@components/sequental-form-constructor'
import { yupResolver } from '@hookform/resolvers/yup'
import { GroupAddOutlined } from '@mui/icons-material'
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import { Controller, useForm } from 'react-hook-form'
import {
  getColumnsByTableRequest,
  getSchemasAllRequest,
  getTablesBySchemaRequest,
} from 'services/request-creators/common'
import {
  AccessPermissionUnit,
  FilterPermissionUnit,
  PermissionType,
  ViewPermissionUnit,
} from 'types/entity-types'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

type AddPermissionModalFormProps = {
  open: boolean
  onClose: (...args: Array<any>) => void
  onSubmit: (...args: Array<any>) => void
  initialValues?: {
    id: string
    name: string
    description: string
    permission:
      | Array<AccessPermissionUnit>
      | FilterPermissionUnit
      | ViewPermissionUnit
    type: PermissionType
  }
}

const schemaValidation = Yup.object().shape({
  id: Yup.string().required('Schema ID is required'),
  name: Yup.string().required('Schema Name is required'),
  description: Yup.string().required('Schema Description is required'),
})

const tableValidation = Yup.object().shape({
  id: Yup.string().required('Table ID is required'),
  name: Yup.string().required('Table Name is required'),
  description: Yup.string().required('Table Description is required'),
})

const columnValidation = Yup.object().shape({
  id: Yup.string().required('Column ID is required'),
  name: Yup.string().required('Column Name is required'),
  description: Yup.string().required('Column Description is required'),
})

const permissionObjectSchema = Yup.object().shape({
  schema: schemaValidation,
  table: tableValidation,
  column: columnValidation,
})

const validationSchema = Yup.object()
  .shape({
    id: Yup.string().required('Id is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required'),
    permission: Yup.lazy((value) => {
      if (typeof value === 'string') {
        return Yup.string()
          .oneOf(
            [ViewPermissionUnit.non_private, ViewPermissionUnit.private],
            'Invalid permission for the given type',
          )
          .required('Permission is required')
      }
      if (Array.isArray(value)) {
        return Yup.array()
          .of(permissionObjectSchema)
          .required('At least one permission is required')
      }
      return Yup.mixed().test('is-valid', 'Invalid format', () => false) // Default, fails validation
    }),
  })
  .when('type', (type, schema) => {
    if ((type as unknown as PermissionType) === PermissionType.data_view) {
      return schema.shape({
        permission: Yup.string()
          .oneOf(
            [ViewPermissionUnit.non_private, ViewPermissionUnit.private],
            'Invalid permission for the given type',
          )
          .required('At least one permission is required'),
      })
    }
    return schema.shape({
      permission: Yup.array()
        .of(permissionObjectSchema)
        .required('At least one permission is required'),
    })
  })

export const ManagePermissionModalForm = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}: AddPermissionModalFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues || { id: uuidv4() },
  })

  const type = watch('type')

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        gap={2}
        sx={{
          position: 'absolute',
          margin: '0 auto',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          transition: 'all 0.3s ease-in-out',
          transform: open ? 'scale(1)' : 'scale(0)',
        }}
      >
        <ModalHeaderSimple
          icon={<GroupAddOutlined />}
          onClose={onClose}
          title="Manage permissions"
        />
        <Stack sx={{ px: 10, pb: 10, pt: 5, height: 600, overflow: 'scroll' }}>
          <Typography id="modal-description" variant="body2">
            Feel free to create or edit permission.
          </Typography>
          <Typography id="modal-description" fontWeight={700} variant="body2">
            After you create permission please manage group from group
            management UI for attaching users and permissions
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  margin="normal"
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              defaultValue={PermissionType.data_access}
              render={({ field }) => (
                <>
                  <InputLabel
                    id="permission-simple-select-outlined-label"
                    sx={{ paddingBottom: 1, paddingTop: 1 }}
                  >
                    Permission type
                  </InputLabel>
                  <Select
                    {...field}
                    id="permission-simple-select-helper"
                    error={!!errors.type}
                  >
                    <MenuItem value={PermissionType.data_access}>
                      {PermissionType.data_access}
                    </MenuItem>
                    <MenuItem value={PermissionType.data_filter}>
                      {PermissionType.data_filter}
                    </MenuItem>
                    <MenuItem value={PermissionType.data_filter_allow_all}>
                      {PermissionType.data_filter_allow_all}
                    </MenuItem>
                    <MenuItem value={PermissionType.data_view}>
                      {PermissionType.data_view}
                    </MenuItem>
                  </Select>
                </>
              )}
            />

            {type === PermissionType.data_view ? (
              <Controller
                name="permission"
                control={control}
                defaultValue={ViewPermissionUnit.non_private}
                render={({ field }) => (
                  <>
                    <InputLabel
                      id="view-permission-simple-select-outlined-label"
                      sx={{ paddingBottom: 1, paddingTop: 1 }}
                    >
                      View permission value
                    </InputLabel>
                    <Select
                      {...field}
                      id="view-permission-simple-select-helper"
                      error={!!errors.permission}
                    >
                      <MenuItem value={ViewPermissionUnit.non_private}>
                        {ViewPermissionUnit.non_private}
                      </MenuItem>
                      <MenuItem value={ViewPermissionUnit.private}>
                        {ViewPermissionUnit.private}
                      </MenuItem>
                    </Select>
                  </>
                )}
              />
            ) : (
              <Controller
                name="permission"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <SequentalFormConstructor<AccessPermissionUnit>
                    {...field}
                    value={
                      (typeof field.value === 'string'
                        ? [{}]
                        : field.value) as Array<AccessPermissionUnit>
                    }
                    error={errors.permission?.message ?? ''}
                    labelsHash={{
                      schema: 'schema',
                      table: 'table',
                      column: 'column',
                    }}
                    sequenceArray={['schema', 'table', 'column']}
                    fetchingHash={{
                      schema: () => getSchemasAllRequest(),
                      table: ({ schema }) =>
                        getTablesBySchemaRequest(schema.id),
                      column: ({ table }) => getColumnsByTableRequest(table.id),
                    }}
                  />
                )}
              />
            )}

            <Box display={'flex'} justifyContent={'center'}>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: 2 }}
                primary="Create"
              />
            </Box>
          </form>
        </Stack>
      </Box>
    </Modal>
  )
}
