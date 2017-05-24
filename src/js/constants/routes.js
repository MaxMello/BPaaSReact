const baseURL = "https://sow-stf.ful.informatik.haw-hamburg.de/api/";
const version = "v1/";

export const ROUTES = {
    businessProcesses: function() {
        return baseURL + version + "bp";
    },
    businessProcess: function(id) {
        return baseURL + version + "bp/" + id;
    },
    services: function() {
        return baseURL + version + "services";
    },
    service: function(id) {
        return baseURL + version + "services/" + id;
    },
    billing: function(user){
        return baseURL + version + "user/" + user + "/monitor";
    },
    startProcess: function(user, processID){
        return baseURL + version + "user/" + user + "/bp/" + processID + "/start";
    },
    processInstance: function(user, processID, instanceID){
        return baseURL + version + "user/" + user + "/bp/" + processID + "/instances/" + instanceID;
    }
};

// TODO Which route is for writing? POST /bp und POST /services ?