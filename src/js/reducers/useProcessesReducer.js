const initialState = {
    processes: [],
    loading: false
};

export default function reducer(
    state=initialState, action) {

    switch (action.type) {
        case "LOAD_PROCESSES": {
            return {...state, processes: action.payload.processes, loading: action.payload.loading};
        }
    }

    return state;
}
