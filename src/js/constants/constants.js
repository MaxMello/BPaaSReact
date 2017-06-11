export const ACTIONS = {
    USER_LOGIN: "USER_LOGIN", // user
    USER_LOGOUT: "USER_LOGOUT", // user, processes, useProcesses, manageProcesses, manageServices, services

    USE_PROCESSES_FETCH_REQUEST: "USE_PROCESSES_FETCH_REQUEST", // useProcesses
    USE_PROCESSES_FETCH_SUCCESS: "USE_PROCESSES_FETCH_SUCCESS", // useProcesses, processes
    USE_PROCESSES_FETCH_ERROR: "USE_PROCESSES_FETCH_ERROR", // useProcesses

    USE_PROCESS_USE_REQUEST: "USE_PROCESS_USE_REQUEST", // useProcesses
    USE_PROCESS_USE_SUCCESS: "USE_PROCESS_USE_SUCCESS", // useProcesses
    USE_PROCESS_USE_ERROR: "USE_PROCESS_USE_ERROR", // useProcesses

    USE_PROCESS_INSTANCE_REQUEST: "USE_PROCESS_INSTANCE_REQUEST", // useProcesses
    USE_PROCESS_INSTANCE_SUCCESS: "USE_PROCESS_INSTANCE_SUCCESS", // useProcesses
    USE_PROCESS_INSTANCE_ERROR: "USE_PROCESS_INSTANCE_ERROR", // useProcesses

    BILLING_REQUEST: "BILLING_REQUEST", // useProcesses
    BILLING_SUCCESS: "BILLING_SUCCESS", // useProcesses
    BILLING_ERROR: "BILLING_ERROR", // useProcesses

    MANAGE_PROCESSES_FETCH_REQUEST: "MANAGE_PROCESSES_FETCH_REQUEST", // manageProcesses
    MANAGE_PROCESSES_FETCH_SUCCESS: "MANAGE_PROCESSES_FETCH_SUCCESS", // manageProcesses, processes
    MANAGE_PROCESSES_FETCH_ERROR: "MANAGE_PROCESSES_FETCH_ERROR", // manageProcesses

    MANAGE_PROCESS_FETCH_REQUEST: "MANAGE_PROCESSES_FETCH_REQUEST", // manageProcesses
    MANAGE_PROCESS_FETCH_SUCCESS: "MANAGE_PROCESSES_FETCH_SUCCESS", // manageProcesses, processes
    MANAGE_PROCESS_FETCH_ERROR: "MANAGE_PROCESSES_FETCH_ERROR", // manageProcesses

    MANAGE_PROCESSES_CHANGE_PROCESS: "MANAGE_PROCESSES_CHANGE_PROCESS",

    MANAGE_PROCESSES_WRITE_REQUEST: "MANAGE_PROCESSES_WRITE_REQUEST",
    MANAGE_PROCESSES_WRITE_SUCCESS: "MANAGE_PROCESSES_WRITE_SUCCESS",
    MANAGE_PROCESSES_WRITE_ERROR: "MANAGE_PROCESSES_WRITE_ERROR",

    MANAGE_SERVICES_FETCH_REQUEST: "MANAGE_SERVICES_FETCH_REQUEST", // manageServices
    MANAGE_SERVICES_FETCH_SUCCESS: "MANAGE_SERVICES_FETCH_SUCCESS", // manageServices, services
    MANAGE_SERVICES_FETCH_ERROR: "MANAGE_SERVICES_FETCH_ERROR", // manageServices

    MANAGE_SERVICE_FETCH_REQUEST: "MANAGE_SERVICES_FETCH_REQUEST", // manageServices
    MANAGE_SERVICE_FETCH_SUCCESS: "MANAGE_SERVICES_FETCH_SUCCESS", // manageServices, services
    MANAGE_SERVICE_FETCH_ERROR: "MANAGE_SERVICES_FETCH_ERROR", // manageServices

    MANAGE_SERVICES_WRITE_REQUEST: "MANAGE_SERVICES_WRITE_REQUEST",
    MANAGE_SERVICES_WRITE_SUCCESS: "MANAGE_SERVICES_WRITE_SUCCESS",
    MANAGE_SERVICES_WRITE_ERROR: "MANAGE_SERVICES_WRITE_ERROR"
};

export const USER_STATUS = {
    NO_USER: "NO_USER",
    EXISTS: "EXISTS"
};

export const FETCH_STATUS = {
    NOT_FETCHING: "NOT_FETCHING", // Initial status, should not be set after first fetch
    FETCHING: "FETCHING",
    FETCH_SUCCESS: "FETCH_SUCCESS", // Status should be success if data has arrived
    FETCH_ERROR: "FETCH_ERROR"
};

export function GET_REQUEST(){
    return {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
}

export function PUT_REQUEST(body){
    return {
        method: "PUT",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        "body": body
    }
}