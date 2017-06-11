const debug = process.env.NODE_ENV !== "production";
const baseURL = debug ? "http://tti3.hawhh.de/api/" : "/api/";
const version = "v1/";

export const ROUTES = {
    businessProcesses: function() {
        const url = baseURL + version + "bp";
        console.log("Calling: " + url);
        return url;
    },
    businessProcess: function(id) {
        const url = baseURL + version + "bp/" + id;
        console.log("Calling: " + url);
        return url;
    },
    services: function() {
        const url = baseURL + version + "service";
        console.log("Calling: " + url);
        return url;
    },
    service: function(id) {
        const url = baseURL + version + "service/" + id;
        console.log("Calling: " + url);
        return url;
    },
    billing: function(user){
        const url = baseURL + version + "user/" + user + "/monitor";
        console.log("Calling: " + url);
        return url;
    },
    startProcess: function(user, processID){
        const url = baseURL + version + "user/" + user + "/bp/" + processID + "/start";
        console.log("Calling: " + url);
        return url;
    },
    processInstance: function(user, processID, instanceID){
        const url = baseURL + version + "user/" + user + "/bp/" + processID + "/instances/" + instanceID;
        console.log("Calling: " + url);
        return url;
    }
};