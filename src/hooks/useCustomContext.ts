import { useContext } from 'react'
import { ContextType, CustomContext } from '../Context'

export const useCustomContext = (): ContextType => useContext(CustomContext)
