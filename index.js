// implement your API here

const express = require('express');

const server = express();
const db = require('./data/db');
const parser = express.json();

server.use(parser);

// ENDPOINTS

// POST API/POSTS
server.post('/api/posts', (req, res) => {
    const post = req.body;
    const { title, contents } = req.body;
    db.insert(post)
    .then((post) => {
        if (title, contents) {
            res.status(201).json(post);
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }
    })
    .catch(err => {
        res.status(500)
        .json({ error: "There was an error while saving the post to the database" });
    })
});

// GET API/POSTS
server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500)
        .json({ error: "The posts information could not be retrieved." });
    })
});

// GET API/POSTS/:ID
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500)
        .json({ error: "The post information could not be retrieved." });
    })
});

// DELETE API/USERS/:ID
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then((count) => {
        if (count) {
            res.status(200).json({message: "Successfully deleted"});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500)
        .json({ error: "The post could not be removed" });
    })
});

// // UPDATE API/USERS/:ID
// server.put('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const user = req.body;
//     const { name, bio } = req.body;
//     db.update(id, user)
//     .then((count) => {
//         if (count) {
//             db.findById(id).then(user => {
//                 if (name, bio) {
//                     res.status(200).json(user);
//                 } else {
//                     res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
//                 }
//             })
//         } else {
//             res.status(404).json({ message: "The user with the specified ID does not exist." });
//         }
//     })
//     .catch(err => {
//         res.status(500)
//         .json({ error: "The user could not be removed" });
//     })
// });

// SERVER LISTENING

server.listen(7000, () => console.log('API running on port 7000'));