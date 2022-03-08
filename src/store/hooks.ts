import {
  TypedUseSelectorHook, useSelector, useDispatch,
} from 'react-redux'

import type { RootStateType, AppDispatchType } from './store'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
