const apis = {
    "getPendingApprovals": {
        "urls": "/api/admin/site-approval",
        "method": "GET"
    },
    "forceGetSiteVersionDetails": {
        "urls": "/api/admin/sites?version=:versionId",
        "method": "GET"
    }
}

export default apis;