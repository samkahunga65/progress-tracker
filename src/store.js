import React, { createContext, useReducer } from "react";
export const CTX = createContext();

const initState = {
    monthData:[],
    MonthData:[],
    notifications:{},
    document:{}
};
let reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_DOCUMENT_ID":
      return{
        ...state,
        document:{}
      }

    case "SET_DOCUMENT_ID":
      return{
        ...state,
        document:action.payload
      }
    case "REMOVE_NOTIFICATIONS":
      return{
        ...state,
        notifications:{}
      }
    case "ADD_NOTIFICATION":
      return{
        ...state,
        notifications:action.payload
      }
    case "ADD_DAY":
        return{
          ...state,
          MonthData:[action.payload]
        }
    case "ADD_MONTH":
        return{
            ...state,
            monthData:[...state.monthData, action.payload]
        }
    default:
      return state;
  }
};
export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <CTX.Provider value={[state, dispatch]}>{props.children}</CTX.Provider>
  );
}
