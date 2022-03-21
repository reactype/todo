import { useState, useCallback, ChangeEventHandler ,KeyboardEventHandler } from 'react'
import { useTodoSelector, useTodoDispatch } from '../store/hooks'
import { Action } from '../store/store'

import styled from 'styled-components'
import IconCheck from './IconCheck'

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

  > input {
    flex: 1;
    padding: 24px 0;
    font-size: 20px;

    ::placeholder {
      color: rgba(175, 47, 47, 0.15);
      font-size: 24px;
    }
    outline: none;
  }
`

function TodoInput () {
  const [todo, setTodo] = useState('')
  const dispatch = useTodoDispatch()
  const {
    hasTodoList,
    isAllChecked,
  } = useTodoSelector()

  const onEnterPressed: KeyboardEventHandler = useCallback((e) => {
    if (e.key !== 'Enter') return
    if (todo.trim() === '') return

    dispatch(Action.addTodo(todo))
    setTodo('')
  }, [todo, dispatch])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTodo(e.target.value)
  }, [])

  return <StyledTodoInput>
    <IconCheck hidden={!hasTodoList}
               checked={isAllChecked}
               toggle={() => dispatch(Action.toggleAll())} />
    <input type="text"
           placeholder="What needs to be done?"
           value={todo}
           onChange={onChange}
           onKeyPress={onEnterPressed} />
  </StyledTodoInput>
}

export default TodoInput
