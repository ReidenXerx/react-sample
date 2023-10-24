import { Button } from '@components/button'
import ModalHeaderSimple from '@components/modal-header-simple'
import { yupResolver } from '@hookform/resolvers/yup'
import { GroupAddOutlined } from '@mui/icons-material'
import { Box, Stack, TextField, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

type AddPermissionModalFormProps = {
  open: boolean
  onClose: (...args: Array<any>) => void
  onSubmit: (...args: Array<any>) => void
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
})

export const ManageGroupModalForm = ({
  open,
  onClose,
  onSubmit,
}: AddPermissionModalFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

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
          title="Manage group"
        />
        <Stack sx={{ px: 10, pb: 10, pt: 5 }}>
          <Typography id="modal-description" variant="body2">
            Feel free to create group.
          </Typography>
          <Typography id="modal-description" fontWeight={700} variant="body2">
            After you create group please manage group from group management UI
            for attaching users and permissions
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
