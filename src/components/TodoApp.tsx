import styled from 'styled-components'

import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'

const StyledTodoHeader = styled.header`
  color: rgba(175, 47, 47, 0.15);
  text-align: center;
  font-size: 100px;
  font-weight: 100;
  font-family: "Helvetica Neue";
`
function TodoHeader () {
  return <StyledTodoHeader>
    todos
  </StyledTodoHeader>
}

const StyledTodoBody = styled.div`
  border: 1px solid #e6e6e6;
`
function TodoBody () {
  return <StyledTodoBody>
    <TodoInput />
    <TodoList />
    <TodoFilter />
  </StyledTodoBody>
}

const StyledTodo = styled.div`
  width: 800px;
  max-width: 90%;
`
function TodoApp () {
  return <StyledTodo>
    <TodoHeader />
    <TodoBody />
  </StyledTodo>
}

export default TodoApp
