import { USER_STATUS, ACTIONS } from "../constants/constants";


/**
 * Stores the input parameter as the username in state
 * @param name
 * @returns {{type: string, payload: {status: string, userData: {name: *}}}}
 */
export function login(name){
    return {
        type: ACTIONS.USER_LOGIN,
        payload: {
            "status": USER_STATUS.EXISTS,
            "userData": {
                "name": name
            }
        }
    }
}

/**
 * The logout action results in every piece of data fetched from the server getting deleted
 * @returns {{type: string, payload: {status: string, userData: {}}}}
 */
export function logout(){
    return {
        type: ACTIONS.USER_LOGOUT
    }
}