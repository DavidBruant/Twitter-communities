"use strict";

var Q = require('q');
var request = require('request');

var getAccessToken = require('./twitter-application-only-auth.js');

// 96 times 15 mins in 24h

module.exports = function(CONSUMER_KEY, CONSUMER_SECRET){
    
    if(!CONSUMER_KEY || !CONSUMER_SECRET)
        throw new Error('missing credentials');
    
    var accessTokenP = getAccessToken(CONSUMER_KEY, CONSUMER_SECRET);
    
    return {
        getFriends: function(user){
            return accessTokenP.then(function(accessToken){
                var deferred = Q.defer();

                request({
                    method: 'GET',
                    url: 'https://api.twitter.com/1.1/friends/ids.json?count=5000&screen_name='+user,
                    headers: {
                        'Authorization': 'Bearer '+accessToken
                    }
                }, function(err, response, body){
                    console.log('/1.1/friends/ids.json status', response.statusCode);

                    if(err){
                        deferred.reject(err);
                        return;
                    }

                    if(response.statusCode >= 400){
                        deferred.reject(response.status);
                        return;
                    }

                    deferred.resolve(JSON.parse(body).ids);
                });

                return deferred.promise;
            })
        },
        
        
    }
}