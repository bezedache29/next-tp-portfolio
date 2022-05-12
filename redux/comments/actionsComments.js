import { ADD_ONE, GET_ALL } from "./typesComments"

export const addOneComment = (data) => {
  return {
    type: ADD_ONE,
    payload: {
      data
    }
  }
}

export const loadComments = (comments) => {
  return {
    type: GET_ALL,
    payload: {
      comments
    }
  }
}