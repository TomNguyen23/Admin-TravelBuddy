const apis = {
    "getPendingApprovals": {
        "urls": "/api/admin/site-approval",
        "method": "GET"
    },
    "forceGetSiteVersionDetails": {
        "urls": "/api/admin/site-approval/",
        "method": "GET"
    },
    "updateSiteVersionDetails": {
        "urls": "/api/admin/site-approval",
        "method": "PUT"
    },
    "getAllSites": {
        "urls": "/api/admin/site-types",
        "method": "GET"
    },
    "getSiteTypeAndServices": {
        "urls": "/api/site-types/:id/services",
        "method": "GET"
    }
}

export default apis;