export const signInfunc = (user) => {
  return (dispatch) => {
    dispatch({
      type: "in",
      payload: user,
    });
  };
};

export const signOutfunc = (user) => {
  return (dispatch) => {
    dispatch({
      type: "out",
      payload: user,
    });
  };
};
