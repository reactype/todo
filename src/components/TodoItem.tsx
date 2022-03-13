import { useCallback } from 'react'
import { useAppDispatch } from '../store/hooks'
import { toggleTodo, TodoItemType } from '../store/store'

import classNames from 'classnames'
import styled from 'styled-components'

const StyledTodoItem = styled.div`
`
function TodoItem ({ item }: { item: TodoItemType }) {
  const dispatch = useAppDispatch()
  const onClick = useCallback((e) => dispatch(toggleTodo(item)), [item, dispatch])
  return <StyledTodoItem
    className={classNames({ done: item.done })}
    onClick={onClick}>
    <span>
      { `${item.content} (${item.done})` }
    </span>
  </StyledTodoItem>
}

export default TodoItem
