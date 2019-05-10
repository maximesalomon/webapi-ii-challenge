// implement your API here

const express = require('express');
const postRouter = require('./routes/post-router')

const server = express();
const parser = express.json();
server.use(parser);

server.get('/', (req, res) => {
  res.send(`<h1>Lambda Blog API</h1>`);
});

server.use('/api/posts', postRouter)

module.exports = server;

// SERVER LISTENING

server.listen(7000, () => console.log('API running on port 7000'));