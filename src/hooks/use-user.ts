import { getUserData } from './../store/selectors/user'
import { useAppDispatch } from '@store/store'
import { useSelector } from 'react-redux'
import { setUserData, UserData } from '@store/slices/user/allData'

export const useUser = () => {
  const dispatch = useAppDispatch()

  const user: UserData | undefined = useSelector(getUserData)

  const onSetUserData = (data: UserData) => {
    dispatch(setUserData({ data }))
  }

  return {
    user,
    onSetUserData,
  }
}
