'use strict';
/**
 * Created by Navit
 */
const Config = require('../Config')
const swaggerOptions = {
    pathPrefixSize: 2,
    info: {
        'title': `${Config.APP_CONSTANTS.SERVER.APP_NAME} API Documentation`,
        'description': `${Config.APP_CONSTANTS.SERVER.APP_NAME} API documentation.`,
        'version': '0.0.1'
    }
};

exports.register = function (server, options) {
    server.register({
        plugin: require('hapi-swagger'),
        options: swaggerOptions
    }, {}, function (err) {
        if (err) server.log(['error'], 'hapi-swagger load error: ' + err)
        else server.log(['info'], 'hapi-swagger interface loaded')
    });
};

exports.name = 'swagger-plugin';
