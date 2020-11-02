const initialPoints = 0;

export function pointReducer(pointsState, action) {
  switch (action.type) {
    case "reset":
      return initialPoints;
    case "increment":
      return pointsState + 1;
    case "decrement":
      return pointsState - 1;
    default:
      return pointsState;
  }
}
