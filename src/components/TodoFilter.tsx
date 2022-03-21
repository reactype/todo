import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { useTodoDispatch, useTodoSelector } from '../store/hooks'
import { Action, FILTER, FilterType } from '../store/store'

const StyledTodoFilter = styled.div`
  background-color: white;
  border-top: 1px solid lightgrey;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  padding: 12px;
  font-size: 12px;

  .items-left {
    width: fit-content;
  }

  .filter-tabs {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .btn-clear-all {
    float: right;
    cursor: pointer;
  }
`

const StyledFilterTab = styled.div`
  border-radius: 2px;
  cursor: pointer;
  padding: 2px 4px;

  &:hover:not(.selected) {
    outline: 1px solid #eeeeee;
  }
  &.selected {
    outline: 1px solid lightgrey;
  }
`

interface FilterTabProps {
  type: FilterType,
}
function FilterTab ({ type }: FilterTabProps) {
  const { todoFilter } = useTodoSelector()
  const dispatch = useTodoDispatch()

  return (
    <StyledFilterTab
      className={classNames({ selected: todoFilter === type })}
      onClick={() => dispatch(Action.setFilterType(type))}
    >
      { type }
    </StyledFilterTab>
  )
}

function TodoFilter () {
  const {
    todoList,
    hasChecked,
  } = useTodoSelector()
  const dispatch = useTodoDispatch()

  if (!todoList.length) {
    return <></>
  }

  return (
    <StyledTodoFilter>
      <div className="items-left">
        { todoList.length } item left
      </div>
      <div className="filter-tabs">
        {
          Object.values(FILTER).map((todoFilter: FilterType) => <FilterTab type={todoFilter} key={todoFilter} />)
        }
      </div>
      <div>
      {
        hasChecked
        ? <div
            className="btn-clear-all"
            onClick={() => dispatch(Action.clearCompletedTodoList())}
          >
            Clear completed
          </div>
        : <div />
      }
      </div>
    </StyledTodoFilter>
  )
}

export default TodoFilter
