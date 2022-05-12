import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './comments/reducerComments'
import usersReducer from './users/reducerUsers'

const reducer = {
  users: usersReducer,
  comments: commentsReducer
}

export const store = configureStore({
  reducer,
})