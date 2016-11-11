'use strict';

let co = require('co');
let co_request = require('co-request');

exports.handler = function(event, context) {
    console.log('event ', event);

    let options = {
        method: 'POST',
        url: 'https://login.salesforce.com/services/oauth2/token',
        qs: {
            grant_type: 'authorization_code',
            client_id: '3MVG98XJQQAccJQe5s.9CLZNdWll8Mpr99bCs5xmj7gnDJSQUez7UzTZidWkJKZp7R1eq5AJ796fuIM7mhirM',
            client_secret: '5828632327869003970',
            code: event.query.code,
            redirect_uri: 'https://s3-us-west-2.amazonaws.com/jz-playground/sfdc_opp_kanban/index.html'
        }
    };

    co(function*() {
            let response = yield co_request(options);
            let body = JSON.parse(response.body);
            if (body.error) {
                context.fail(JSON.stringify(body));
            } else {
                context.succeed(body);
            }
        })
        .catch(function(ex) {
            console.log('*** catch ***');
            console.log(ex);
        });
}
