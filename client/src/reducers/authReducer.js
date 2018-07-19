//AuthReducer recieves from authAction.js
import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";
//every reducer has an initial state
const initialState = {
  isAuthenticated: false,
  //user is set to empty by default
  user: {}
};

//actions will be passed into the reducer
export default function(state = initialState, action) {
  //test to see what action was passed in (.type)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), //bool: will have no payload if user was not logged in
        user: action.payload //save whole payload to user
      };
    default:
      return state;
  }
}
