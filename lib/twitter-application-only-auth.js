"use strict";

var Q = require('q');
var request = require('request');

// https://dev.twitter.com/docs/auth/application-only-auth
// RFC 1738

function base64Encode(str){
    return new Buffer(str).toString('base64')
}

module.exports = function(CONSUMER_KEY, CONSUMER_SECRET){
    var encodedConsumerKey = encodeURIComponent(CONSUMER_KEY);
    var encodedConsumerSecret = encodeURIComponent(CONSUMER_SECRET);

    var bearerTokenCredentails = encodedConsumerKey + ':' + encodedConsumerSecret;

    var b64bearerToken = base64Encode(bearerTokenCredentails);
    
    var accessTokenDef = Q.defer();

    request({
        method: 'POST',
        url: "https://api.twitter.com/oauth2/token",
        headers: {
            'Authorization': 'Basic '+b64bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body){
        console.log('/oauth2/token status', response.statusCode);

        if(err){
            accessTokenDef.reject(err);
            return;
        }
        
        if(response.statusCode >= 400){
            accessTokenDef.reject(response.status);
            return;
        }
        
        var accessToken = JSON.parse(body).access_token
        
        accessTokenDef.resolve(accessToken);
        console.log('accessToken', accessToken);
    });

    return accessTokenDef.promise;
}