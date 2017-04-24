export default function reducer(
    state={
      processes: []
    }, action) {

    switch (action.type) {
        case "LOAD_PROCESSES": {
            return {...state, processes: [...state.processes, action.payload]};
        }
    }

    return state;
}
