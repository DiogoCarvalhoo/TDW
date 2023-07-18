function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "increment":
      return { value: state.value + 1 };
    case "decrement":
      return { value: state.value - 1 };
    case "reset":
      return { value: 0 };
    default:
      return state;
  }
}

export default counterReducer;
