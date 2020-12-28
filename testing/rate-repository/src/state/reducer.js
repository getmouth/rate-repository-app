
const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER'
};

export const loginUser = (token) => ({
    type: ACTIONS.LOGIN,
    payload: token
});

export const logoutUser = () => ({
    type: ACTIONS.LOGOUT,
    payload: null
});

export const setUser = (user) => ({
    type: ACTIONS.SET_USER,
    payload: user
});

export const INITIALSTATE = {
    token: null,
    user: null,
};

export const reducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload
            };

        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload
            };

        case ACTIONS.LOGOUT:
            return {
                ...state,
                token: action.payload,
                user: null
            };
        default:
            return state;
    }
};