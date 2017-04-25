const initialState = {
    user: null
};

export default function reducer(
    state=initialState, action) {

    switch (action.type) {
        case "LOGIN": {
            return {...state, user: action.payload};
        }
        case "SIGN_IN": {
            return {...state, user: action.payload};
        }
        case "LOGOUT": {
            return {...state, user: null};
        }
    }

    return state;
}
