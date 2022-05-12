import { GET_USER } from "./typesUsers"

const initialState = {
  oneUser: {}
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_USER:
      return {
        ...state,
        oneUser: action.payload.user
      }
    
    default:
      return state
  }

}

export default usersReducer