import React from 'react';
import axios from 'axios';
//types
import { ActionType, ReducerStateType } from 'types';

export const reducer: React.Reducer<ReducerStateType, ActionType> = (state, action) => {
  const id = action.payload.id; // it can be undefined

  switch (action.type) {
    case 'channel': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
