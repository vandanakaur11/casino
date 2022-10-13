export const defaultValue = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};
