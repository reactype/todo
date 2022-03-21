import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { useTodoDispatch } from '../store/hooks'
import { Action, TodoItemType } from '../store/store'

import classNames from 'classnames'
import styled from 'styled-components'

import IconCheck from './IconCheck'
import { FaTrashAlt } from 'react-icons/fa'

const StyledTodoItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 24px;
  border-top: 1px solid lightgrey;

  > * {
    padding: 12px 4px;
  }

  &:hover > :last-child {
    display: block;
  }
`

const StyledTodoItemInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 8px;
  font-size: 24px;
  border: 0;
  outline: 0;
  margin: 2px;
  cursor: default;

  &.done {
    text-decoration: line-through;
    color: lightgrey;
  }

  &:not(:read-only) {
    outline: 1px solid grey;
    text-decoration: none;
    color: black;
    cursor: text;
  }
`

const DeleteButton = styled(FaTrashAlt)`
  position: absolute;
  right: 8px;
  cursor: pointer;
  display: none;
`

type Props = { todo: TodoItemType }
function TodoItem ({ todo }: Props) {
  const dispatch = useTodoDispatch()
  const [draft, setDraft] = useState(todo.content)
  const [isEditMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus()
    }
  }, [isEditMode])

  const applyDraft = useCallback(() => {
    if (!isEditMode) return
    const nextTodo = {
      ...todo,
      content: draft,
    }
    dispatch(Action.updateTodoContent(nextTodo))
    setEditMode(false)
  }, [isEditMode, draft, todo, dispatch])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setDraft(e.target.value)
  }, [])

  const onEnterPressed: KeyboardEventHandler = useCallback((e) => {
    if (e.key !== 'Enter') return
    applyDraft()
  }, [applyDraft])

  const { done } = todo
  return <StyledTodoItem>
    <IconCheck checked={done}
               toggle={() => dispatch(Action.toggleTodo(todo))} />
    <StyledTodoItemInput
      ref={inputRef}
      value={draft}
      onChange={onChange}
      onKeyPress={onEnterPressed}
      onBlur={applyDraft}
      onDoubleClick={() => setEditMode(true)}
      readOnly={!isEditMode}
      className={classNames({ done })} />
    {
      isEditMode
      ? <></>
      : <DeleteButton onClick={() => dispatch(Action.removeTodo(todo))} />
    }
  </StyledTodoItem>
}

export default TodoItem
