require('newrelic');

const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const morgan = require('morgan');
const comment = require('./controller/comments.js');

//serve files from dist
app.use(express.static(path.join(__dirname, '../client/public')));

//See all incoming requests
//app.use(morgan('dev'));

//JSON requests
app.use(express.json());

app.get('/song/:id/comments', comment.getComments);
app.post('/song/:id/comment', comment.postComment);
app.patch('/song/:id/comment/:comment_id', comment.updateComment);
app.delete('/song/:id/comment/:comment_id', comment.deleteComment);

//notification on open server
app.listen(port, () => console.log(`listening on port ${port}!`));