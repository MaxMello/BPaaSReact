const initialState = {
    processes: [],
    useProcesses: {}
};

export default function reducer(
    state=initialState, action) {
    console.log("USE PROCESS REDUCER");
    console.log(action);
    switch (action.type) {
        case "FETCH_REQUEST": {
            return {...state, useProcesses: {...state.useProcesses, status: "FETCHING"}}
        }
        case "FETCH_SUCCESS": {
            processIDs = action.payload.processes.map((p) => p.id);

            return {...state,
                processes: {...state.processes, ...action.payload.processes},
                useProcesses: {processes: processIDs, status: "SUCCESS"}};
        }
        case "FETCH_ERROR": {
            return {...state, useProcesses: {...state.useProcesses, status: "ERROR"}}
        }
    }

    return state;
}
