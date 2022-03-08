import classNames from 'classnames'
import { useState, useCallback, ChangeEventHandler ,KeyboardEventHandler, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { addTodo, removeTodo, toggleTodo, TodoItemType } from '../store/store'

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
  </StyledTodoBody>
}

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
  }

  > input {
    flex: 1;
    ::placeholder {
      color: rgba(175, 47, 47, 0.15);
      font-size: 24px;
    }
    outline: none;
  }
`

function TodoInput () {
  const [todo, setTodo] = useState('')
  const dispatch = useAppDispatch()

  const onEnterPressed: KeyboardEventHandler = useCallback((e) => {
    if (e.key !== 'Enter') return
    dispatch(addTodo(todo))
  }, [todo])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTodo(e.target.value)
  }, [])

  return <StyledTodoInput>
    <button className="off">
      <span>＞</span>
    </button>
    <input type="text"
           placeholder="What needs to be done?"
           onChange={onChange}
           onKeyPress={onEnterPressed} />
  </StyledTodoInput>
}

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

const StyledTodoItem = styled.div`
`
function TodoItem ({ item }: { item: TodoItemType }) {
  const dispatch = useAppDispatch()
  const onClick = useCallback((e) => dispatch(toggleTodo(item)), [item])
  return <StyledTodoItem
    className={classNames({ done: item.done })}
    onClick={onClick}>
    <span>
      { `${item.content} (${item.done})` }
    </span>
  </StyledTodoItem>
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
