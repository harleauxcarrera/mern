import { TEST_DISPATCH } from "./types";

//Register User Action called Register.js Form is submitted
export const registerUser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  }
}