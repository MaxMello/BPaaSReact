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
};