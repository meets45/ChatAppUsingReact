const userReducer = (state = [0], action) => {
  if (action.type === "in") {
    state.pop();
    return (state = state.concat(action.payload));
  } else if (action.type === "out") {
    return (state = [0]);
  } else {
    return state;
  }
};

export default userReducer;
