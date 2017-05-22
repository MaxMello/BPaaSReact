import { ACTIONS } from "../constants/constants";

const processes = {
    "process1": {
        "id": "process1",
        "name": "Prozess 1",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "services": ["service1", "service2"]
    }
};

export default function reducer(state=processes, action) {
    switch(action.type){
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, processes); // Reset the data to the default value
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_SUCCESS:
        case ACTIONS.USE_PROCESSES_FETCH_SUCCESS: {
            // TODO Assumes processes to be an object of objects
            return {...state, ...action.payload.processes}; // This syntax should override old process information
        }
    }
    return state;
}