import { defaultValue } from "./actions";
import { DEFAULT_CASE } from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case DEFAULT_CASE:
      return defaultValue(state, action);
    default:
      return state;
  }
};

export default reducer;
