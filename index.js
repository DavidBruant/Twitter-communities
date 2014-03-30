"use strict";

var credentials = require('./data/credentials.json');
var twitter = require('./lib/twitterAPI.js')(credentials.CONSUMER_KEY, credentials.CONSUMER_SECRET);

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

twitter.getFriends('oncletom')
    .then(function(friendIds){
        console.log(friendIds);
    })
    .fail(function(err){
        console.error(err);
    });



/*
Ideally:
* From some root people, get who they follow (outgoing edges)
* See how many times root people follow one another. Take the mean of that (MeanRootFollowed)
If new nodes have at least half MeanRootFollowed followers, add them to the root set. Keep going.

Cache:
files.
user.<id>.json

interface User{
    // identification
    id_str : number
    name :
    screen_name :
    
    // misc infos
    created_at : Date
    description :
    profile_image_url_https : 
    url :
    
    followers_count :
    friends_count :
    
    // graph infos
    friends : User_ids_str[] // outgoing edges
    
    // book_keeping
    last_updated: Date
    
    // to help understand importance
    latest_tweets : Tweet[]
    
}

interface Tweet{
    id_str :
    
    favorite_count : 
    retweet_count :
    replies : // see https://github.com/adriancrepaz/acTwitterConversation/
    
    created_at : Date
    
    in_reply_to_status_id_str: 
    lang : 
    retweeted_status : 
    text : 
    
}


*/

