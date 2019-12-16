const initialState = {
  ex: null
};

const other = (state = initialState, action) => {
  switch (action.type) {
    case undefined:
      return {
        ...state,
        ex: undefined
      };
    default:
      return state;
  }
};

export default other;
