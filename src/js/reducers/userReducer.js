import { USER_STATUS, USER_ACTIONS } from "../constants/constants";

const initialState = {
    "status": USER_STATUS.NO_USER,
    "userData": {}
};

export default function reducer(state=initialState, action) {
    switch(action.type){
        case USER_ACTIONS.LOGIN: {
            return {...state, ...action.payload};
        }
        case USER_ACTIONS.LOGOUT: {
            return {...state, ...action.payload};
        }

    }
    return state;
}
