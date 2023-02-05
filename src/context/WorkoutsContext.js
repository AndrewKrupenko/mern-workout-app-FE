import React, { createContext, useReducer } from "react";

import { CREATE_WORKOUT, DELETE_WORKOUT, SET_WORKOUTS } from "actions";

export const WorkoutsContext = createContext();

// state === in this case previous state
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return {
        workouts: action.payload,
        isLoading: false,
      };
    case CREATE_WORKOUT:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    isLoading: true,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
