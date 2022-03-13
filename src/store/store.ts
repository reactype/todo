import { createStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type TodoItemType = {
  id: number,
  content: string,
  done: boolean,
}
export const slice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [] as Array<TodoItemType>,
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
  },
})

export const {
  addTodo, removeTodo, toggleTodo, toggleAll,
} = slice.actions

const enhancedReducer = persistReducer({
  key: 'root',
  storage,
}, slice.reducer)

export const store = createStore(enhancedReducer)
export const persistor = persistStore(store)

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export default store
