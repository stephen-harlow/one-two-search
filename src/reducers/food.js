function food(state = {}, action) {
  switch(action.type) {
    case 'FOOD_FETCHED':
      console.log("FOOD_FETCHED")
      console.log(action);
      return action.result;
    default:
      return state;
  }
}

export default food;
