import styled from 'styled-components'
import TodoApp from './components/TodoApp'

function App () {
  const StyledTodoApp = styled.div`
    display: flex;
    justify-content: center;
    padding: 32px;
    background-color: #f5f5f5;
    height: calc(100vh - 64px);
    overflow: hidden;
  `
  return <StyledTodoApp>
    <TodoApp />
  </StyledTodoApp>
}

export default App
