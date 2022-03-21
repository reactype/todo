import {
  TypedUseSelectorHook, useSelector, useDispatch,
} from 'react-redux'

import type { RootStateType, DispatchType } from './store'
import { FILTER } from './store'

const selectTodoListSlice = (state: RootStateType) => {
  const { todoFilter, todoList } = state

  let filteredTodoList = todoList.filter(_ => _)
  switch (todoFilter) {
    case FILTER.ACTIVE:
      filteredTodoList = todoList.filter(_ => !_.done)
      break
    case FILTER.COMPLETED:
      filteredTodoList = todoList.filter(_ => _.done)
      break
    default:
  }

  const hasTodoList = Boolean(todoList.length)
  const hasChecked = hasTodoList && todoList.some(_ => _.done)
  const isAllChecked = hasTodoList && todoList.every(_ => _.done)

  return {
    todoList,
    todoFilter,
    filteredTodoList,
    hasTodoList,
    isAllChecked,
    hasChecked,
  }
}
const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useTodoSelector = () => useAppSelector(selectTodoListSlice)
export const useTodoDispatch = () => useDispatch<DispatchType>()
