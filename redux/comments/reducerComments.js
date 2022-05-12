import { ADD_ONE, GET_ALL } from "./typesComments"

const initialState = []

const commentsReducer = (state= initialState, action) => {

  switch(action.type) {

    case ADD_ONE:
      return [...state, {
        content: action.payload.data.content,
        userName: action.payload.data.userName,
        projectId: action.payload.data.projectId
      }]
    
    case GET_ALL:
      return action.payload.comments

    default:
      return state

  }
}

export default commentsReducer