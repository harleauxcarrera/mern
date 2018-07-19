//AuthReducer recieves from authAction.js


 
//every reducer has an initial state
const initialState = {
  isAuthenticated: false, 
  //user is set to empty by default
  user: {

  }
}
              //actions will be passed into the reducer
export default function(state = initialState, action){
  //test to see what action was passed in (.type)
  switch(action.type){
    
   
    default: 
      return state;
  }
}