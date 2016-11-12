'use strict';

let co = require('co');
let tokenController = require('./controllers/tokenController');

exports.handler = function(event, context) {
    console.log('event ', event);

    co(function*() {
            let path = event.path;
            let result;

            if (path == '/token') {
                result = yield tokenController.getToken(event, context);
            } else if (path == '/refresh') {
                result = yield tokenController.refreshToken(event, context);
            } else {
                result = {
                    status: 'error',
                    message: 'Unrecognizable Request',
                    method: event.method,
                    path: event.path
                };
            }

            if (result.status && result.status == 'error') {
                context.fail(JSON.stringify(result));
            } else {
                context.succeed(result);
            }
        })
        .catch(function(ex) {
            console.log('*** catch ***');
            console.log(ex);
        });
}
