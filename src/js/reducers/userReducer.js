import { USER_STATUS, ACTIONS } from "../constants/constants";

const user = {
    "status": USER_STATUS.EXISTS,
    "userData": {
        "name": "TestUser"
    }
};

export default function reducer(state=user, action) {
    switch(action.type){
        case ACTIONS.USER_LOGIN: {
            return Object.assign({}, action.payload);
        }
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, action.payload);
        }
    }
    return state;
}
