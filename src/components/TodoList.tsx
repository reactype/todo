import { useAppSelector } from '../store/hooks'
import styled from 'styled-components'

import TodoItem from './TodoItem'

const StyledTodoList = styled.ul`
`
function TodoList () {
  const todoList = useAppSelector(state => state.todoList)
  if (todoList.length === 0) {
    return <></>
  }

  return <StyledTodoList>
    { todoList.map((todoItem, idx) => <TodoItem item={todoItem} key={idx} />) }
  </StyledTodoList>
}

export default TodoList
