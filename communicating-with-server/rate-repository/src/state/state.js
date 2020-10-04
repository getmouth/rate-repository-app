import React, { useContext, createContext, useReducer } from 'react';
import { INITIALSTATE } from './reducer';

const StateContext = createContext([INITIALSTATE, () => INITIALSTATE]);

export const StateProvider = ({ reducer, children }) => {
    const [state, dispatch] = useReducer(reducer, INITIALSTATE);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);