import React from 'react';

//types
import { ActionType, ReducerStateType } from 'types';

//constants
import { REMOVE, SELECT } from 'Constants';

export const reducer: React.Reducer<ReducerStateType, ActionType> = (state, action) => {
  switch (action.type) {
    case SELECT: {
      return { ...state, ...action.payload };
    }
    case REMOVE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
