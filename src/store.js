import React, { createContext, useReducer } from "react";
export const CTX = createContext();

const initState = {

};
let reducer = (state, action) => {
  switch (action.type) {

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
