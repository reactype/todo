import { useTodoSelector } from '../store/hooks'
import styled from 'styled-components'

import TodoItem from './TodoItem'

const StyledTodoList = styled.ul`
  padding: 0;
  margin: 0;
  background-color: white ;
`
function TodoList () {
  const { hasTodoList, filteredTodoList } = useTodoSelector()
  if (!hasTodoList) {
    return <></>
  }

  return <StyledTodoList>
    { filteredTodoList.map((todoItem) => <TodoItem todo={todoItem} key={todoItem.id} />) }
  </StyledTodoList>
}

export default TodoList
