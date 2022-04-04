// due to the default export, you can decide what to name it in import.
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// functions of actionTypes.js
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSES_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      // map returns a new array that replaces the element with matching id.
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      // java filter function already returns an array without the specific id deleted from the list
      return state.filter(course =>
        course.id !== action.course.id
      );
    default:
      return state;
  }
}
