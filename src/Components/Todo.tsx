import styled from 'styled-components'

function TodoHeader () {
  const StyledTodoHeader = styled.header`
    color: rgba(175, 47, 47, 0.15);
    text-align: center;
    font-size: 100px;
    font-weight: 100;
    font-family: "Helvetica Neue";
  `
  return <StyledTodoHeader>
    todos
  </StyledTodoHeader>
}

function TodoBody () {
  const StyledTodoBody = styled.div`
    border: 1px solid #e6e6e6;
  `
  return <StyledTodoBody>
    <TodoInput />
    {/* <TodoList /> */}
  </StyledTodoBody>
}

function TodoInput () {
  const StyledTodoInput = styled.div`
    display: flex;
    align-items: stretch;
    background-color: white;
    width: 100%;
    height: 64px;
    cursor: text;

    > * {
      border: 0;
      background-color: unset;
    }

    > button {
      flex: 0;
      min-width: 64px;
      font-size: 36px;
      padding-bottom: 8px;
      visibility: hidden;
      &.off {
        color: 
      }
    }

    > input {
      flex: 1;
      ::placeholder {
        color: rgba(175, 47, 47, 0.15);
        font-size: 24px;
      }
    }
  `
  return <StyledTodoInput>
    <button className="off">
      <span>＞</span>
    </button>
    <input type="text" placeholder="What needs to be done?" />
  </StyledTodoInput>
}

function TodoList () {
  const StyledTodoList = styled.ul`
  `
  return <StyledTodoList>
  </StyledTodoList>
}

function Todo () {
  const StyledTodo = styled.div`
    width: 800px;
    max-width: 90%;
  `
  return <StyledTodo>
    <TodoHeader />
    <TodoBody />
  </StyledTodo>
}

export default Todo
