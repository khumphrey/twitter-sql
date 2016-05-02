'use strict';
const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank.js');
const bluebird = require('bluebird');

module.exports = function makeRouterWithSockets(io, client) {
    client.query = bluebird.promisify(client.query);

    // a reusable function
    function respondWithAllTweets(req, res, next) {
        client.query('SELECT * FROM tweets JOIN users ON tweets.userId = users.id')
            .then(result => {
                let tweets = result.rows;
                res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
            })
    }

    // here we basically treet the root view and tweets view as identical
    router.get('/', respondWithAllTweets);
    router.get('/tweets', respondWithAllTweets);

    // single-user page
    router.get('/users/:username', function(req, res, next) {
        client.query('SELECT * FROM tweets JOIN users ON tweets.userId = users.id WHERE name = $1', [req.params.username])
            .then(result => {
                let tweets = result.rows;
                res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true, username: req.params.username });
            });
    });

    // single-tweet page
    router.get('/tweets/:id', function(req, res, next) {
        client.query('SELECT * FROM tweets JOIN users ON tweets.userId = users.id WHERE tweets.id = $1', [req.params.id])
            .then(result => {
                let tweets = result.rows;
                res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
            });
    });

    // create a new tweet
    router.post('/tweets', function(req, res, next) {
        client.query('INSERT INTO users (name) SELECT $1 WHERE NOT EXISTS (SELECT * FROM users WHERE name = $1)', [req.body.name])
            .then(result => {
                return client.query('INSERT INTO tweets (userid, content) VALUES ((SELECT id FROM users WHERE name = $1), $2) RETURNING *', [req.body.name, req.body.text])
            })
            .then(result => {
                let newTweet = result.rows
                io.sockets.emit('new_tweet', newTweet);
                res.redirect('/');
            })

        //ALTERNATES WAYS/IDEAS ------------------------------------
        
        // client.query('SELECT * FROM users WHERE name = $1', [req.body.name], function(error, result) {
        //   let user = result.rows[0];
        //   if (user) {
        //     client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2) RETURNING *', [user.id, req.body.text], function(err, result) {
        //         console.log('rows', result)
        //         let newTweet = result.rows;
        //         io.sockets.emit('new_tweet', newTweet);
        //         res.redirect('/');
        //     })
        //   } else {

        //   }
        // })
        // client.query('INSERT INTO users (name) SELECT $1 WHERE NOT EXISTS (SELECT * FROM users WHERE name = $1)', [req.body.name], function(error, result) {
        //     client.query('INSERT INTO tweets (userid, content) VALUES ((SELECT id FROM users WHERE name = $1), $2) RETURNING *', [req.body.name, req.body.text], function(err, result) {
        //         var newTweet = result.rows
        //         io.sockets.emit('new_tweet', newTweet);
        //         res.redirect('/');
        //     })
        // })

    });

    return router;
};