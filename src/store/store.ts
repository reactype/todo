import { createStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETED'
/* 객채 내부 값의 타입은 as 없이 어떻게 설정해야할까요..? */
export const FILTER = {
  ALL: 'ALL' as FilterType,
  ACTIVE: 'ACTIVE' as FilterType,
  COMPLETED: 'COMPLETED' as FilterType,
}

export type TodoItemType = {
  id: number,
  content: string,
  done: boolean,
}
export const slice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [] as Array<TodoItemType>,
    todoFilter: FILTER.ALL as FilterType,
  },
  reducers: {
    addTodo (state, action: PayloadAction<string>) {
      state.todoList.push({
        id: Number(new Date()),
        content: action.payload,
        done: false,
      })
    },
    removeTodo (state, action: PayloadAction<TodoItemType>) {
      const { id } = action.payload
      state.todoList = state.todoList.filter(item => item.id !== id)
    },
    toggleTodo (state, action: PayloadAction<TodoItemType>) {
      const { id } = action.payload
      const todoItem = state.todoList.find((item) => item.id === id)
      if (!todoItem) return
      todoItem.done = !todoItem.done
    },
    toggleAll (state) {
      const isAllChecked = state.todoList.every(todo => todo.done)
      state.todoList.forEach(todo => {
        todo.done = !isAllChecked
      })
    },
    updateTodoContent (state, action: PayloadAction<TodoItemType>) {
      const nextTodo = action.payload
      const todoItem = state.todoList.find((item) => item.id === nextTodo.id)
      if (!todoItem) return
      if (nextTodo.content.trim() === '') {
        // 여기서 removeTodo를 dispatch할 방법이 없을까..?
        state.todoList = state.todoList.filter(item => item.id !== nextTodo.id)
        console.log(state.todoList)
        return
      }
      todoItem.content = nextTodo.content
    },
    setFilterType (state, action: PayloadAction<FilterType>) {
      state.todoFilter = action.payload
    },
    clearCompletedTodoList (state) {
      state.todoList = state.todoList.filter(_ => !_.done)
    },
  },
})

export const Action = slice.actions

const enhancedReducer = persistReducer({
  key: 'root',
  storage,
}, slice.reducer)

export const store = createStore(enhancedReducer)
export const persistor = persistStore(store)

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
