import { useAppSelector } from '../store/hooks'
import styled from 'styled-components'

import TodoItem from './TodoItem'

const StyledTodoList = styled.ul`
  padding: 0;
  margin: 0;
  background-color: white ;
`
function TodoList () {
  const todoList = useAppSelector(state => state.todoList)
  if (todoList.length === 0) {
    return <></>
  }

  return <StyledTodoList>
    { todoList.map((todoItem) => <TodoItem todo={todoItem} key={todoItem.id} />) }
  </StyledTodoList>
}

export default TodoList
