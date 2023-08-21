import somethingSlice from '@store/slices/general/something'
import { RootState } from '@store/store'

const persistStatesList: Array<keyof RootState> = [
    somethingSlice.name,
]

