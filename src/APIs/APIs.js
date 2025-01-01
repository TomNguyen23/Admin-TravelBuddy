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
		"urls": "/api/site-types",
		"method": "GET"
	},
	"getSiteTypeAndServices": {
		"urls": "/api/site-types/:id/services",
		"method": "GET"
	},
	"getAllServiceGroups": {
		"urls": "/api/admin/service-groups",
		"method": "GET"
	},
	"associateServiceGroupToType": {
		"urls": "/api/admin/service-groups/associate-type?id=:serviceGroupId&typeId=:typeId",
		"method": "PUT"
	},
	"detachServiceGroupFromType": {
		"urls": "/api/admin/service-groups/associate-type?id=:serviceGroupId&remove=true&typeId=:typeId",
		"method": "PUT"
	},
	"putSiteType": {
		"urls": "/api/admin/site-types/:id",
		"method": "PUT"
	},
	"newSiteType": {
		"urls": "/api/admin/site-types",
		"method": "POST"
	},
	"aspectsByType": {
		"urls": "/api/site-types/:id/aspects",
		"method": "GET"
	},
	"deleteAspects": {
		"urls": "/api/admin/site-types/aspects",
		"method": "DELETE"
	},
	"addAspects": {
		"urls": "/api/admin/site-types/aspects",
		"method": "POST"
	},
	"allSiteServiceGroups": {
		"urls": "/api/admin/service-groups",
		"method": "GET"
	},
	"siteServiceGroupDetail": {
		"urls": "/api/admin/service-groups/:id?associate=true",
		"method": "GET"
	},
	"getAllServices": {
		"urls": "/api/admin/site-services",
		"method": "GET"
	},
	"associateServiceToGroup": {
		"urls": "/api/admin/service-groups/associate-service?id=:id&serviceId=:serviceId",
		"method": "PUT"
	},
	"detachServiceFromGroup": {
		"urls": "/api/admin/service-groups/associate-service?id=:id&serviceId=:serviceId&remove=true",
		"method": "PUT"
	},
	"putServiceGroup": {
		"urls": "/api/admin/service-groups/:id",
		"method": "PUT"
	},
	"newServiceGroup": {
		"urls": "/api/admin/service-groups",
		"method": "POST"
	},
	"newService": {
		"urls": "/api/admin/site-services",
		"method": "POST"
	},
	"putService": {
		"urls": "/api/admin/site-services/:id",
		"method": "PUT"
	},
	"getSystemLogs": {
		"urls": "/api/admin/logs/sys",
		"method": "GET"
	},
	"downloadLogs": {
		"urls": "/api/admin/logs/download-logs",
		"method": "GET"
	},
	"getAdminList": {
		"urls": "/api/admin/admin-accounts?search=:search&page=:page",
		"method": "GET"
	},
	"getAdminDetail": {
		"urls": "/api/admin/admin-accounts/:id",
		"method": "GET"
	},
	"getAllAdminGroups": {
		"urls": "/api/admin/admin-groups",
		"method": "GET"
	},
	"disableAdmin": {
		"urls": "/api/admin/admin-accounts/disable/:id",
		"method": "PUT"
	},
	"enableAdmin": {
		"urls": "/api/admin/admin-accounts/enable/:id",
		"method": "PUT"
	},
	"adminAssociateGroup": {
		"urls": "/api/admin/admin-accounts/attach-group",
		"method": "PUT"
	},
	"adminDetachGroup": {
		"urls": "/api/admin/admin-accounts/detach-group",
		"method": "PUT"
	},
	"saveImage": {
		"urls": "/api/upload",
		"method": "POST"
	},
	"updateAdmin": {
		"urls": "/api/admin/admin-accounts",
		"method": "PUT"
	},
	"resetAdminPassword": {
		"urls": "/api/admin/admin-accounts/reset-password",
		"method": "PUT"
	},
}

export default apis;