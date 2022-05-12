import { GET_USER } from "./typesUsers"

export const loadUser = (user) => {
  return {
    type: GET_USER,
    payload: {
      user
    }
  }
}