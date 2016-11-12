'use strict';

let co = require('co');
let co_request = require('co-request');

module.exports = {

    getToken: function(event, context) {
        return co(function*() {
            let options = {
                method: 'POST',
                url: event.query.environment == 'production' ? 'https://login.salesforce.com/services/oauth2/token' : 'https://test.salesforce.com/services/oauth2/token',
                qs: {
                    grant_type: 'authorization_code',
                    client_id: '3MVG98XJQQAccJQe5s.9CLZNdWll8Mpr99bCs5xmj7gnDJSQUez7UzTZidWkJKZp7R1eq5AJ796fuIM7mhirM',
                    client_secret: '5828632327869003970',
                    code: event.query.code,
                    redirect_uri: 'https://s3-us-west-2.amazonaws.com/jz-playground/sfdc_opp_kanban/index.html'
                }
            };
            let response = yield co_request(options);
            return JSON.parse(response.body);
        });
    },

    refreshToken: function(event, context) {
        return co(function*() {
            let options = {
                method: 'POST',
                url: event.query.environment == 'production' ? 'https://login.salesforce.com/services/oauth2/token' : 'https://test.salesforce.com/services/oauth2/token',
                qs: {
                    grant_type: 'refresh_token',
                    client_id: '3MVG98XJQQAccJQe5s.9CLZNdWll8Mpr99bCs5xmj7gnDJSQUez7UzTZidWkJKZp7R1eq5AJ796fuIM7mhirM',
                    client_secret: '5828632327869003970',
                    refresh_token: event.query.refresh_token
                }
            };
            let response = yield co_request(options);
            return JSON.parse(response.body);
        });
    }
}
