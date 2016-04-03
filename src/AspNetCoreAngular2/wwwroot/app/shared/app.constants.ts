export let CONFIGURATION = {
    baseUrls: {
        server: 'http://localhost:5000/',
        apiUrl: 'api/',
        authorizationUrl: 'https://localhost:44338/connect/authorize'
    },
    authentication: {
        clientId: 'angular2client',
        response_type: 'id_token token',
        scopes: 'angular2Demo openid',
        adminRoleDescription: 'angular2Demo.admin'
    }
};