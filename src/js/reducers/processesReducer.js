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
            const serverResponse = action.payload;
            const newProcesses = {};
            serverResponse.forEach(e => newProcesses[e.id] = {
                "id": e.id,
                "name": e.name,
                "description": e.description,
                "services": e.services.forEach(s => s.id)
            });
            return {...state, ...newProcesses};
        }
        case ACTIONS.MANAGE_PROCESS_FETCH_SUCCESS:
        case ACTIONS.MANAGE_PROCESSES_WRITE_SUCCESS: {
            const newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
    }
    return state;
}