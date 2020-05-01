const pool = require('../../db/index.js');
const newrelic = require('newrelic');
const redis = require('redis');
const client = redis.createClient(6379, 'redis');
client.on('connect', () => console.log('Connected to Redis') );

client.on("error", function (error) {
  console.error(error);
});

const getComments = (req, res) => {
  const songId = req.params.id;
  client.exists(JSON.stringify(songId), function (err, reply) {
    if (reply === 1) {
      console.log('exists');
      client.get(JSON.stringify(songId), function (err, reply) {
        res.send(JSON.parse(reply));
      });
    }
    else {
      console.log('doesn\'t exist');
      const query = {
        text: `SELECT * FROM comments WHERE song_id = $1`,
        values: [songId],
      };
      pool.query(query, (err, data) => {
        if (err) {
          newrelic.noticeError('failed to send');
          console.log(err);
          res.sendStatus(400);
          res.end();
        } else {
          // console.log(data.rows[0])
          res.send(data.rows[0]);
          client.set(JSON.stringify(songId), (JSON.stringify(data.rows[0] || "")));
        }
      });
    }
  });
  // console.log(songId);
};

const postComment = (req, res) => {
  const songId = req.params.id;
  // console.log(req);
  const query = {
    text: `INSERT INTO comments(comment_text, song_time_stamp, post_date, user_id, song_id) VALUES('comment3', 324234,'Thu Feb 20 2020 21:24:29 GMT-0800 (Pacific Standard Time)', 564655, $1) RETURNING id;`,
    values: [songId],
  };
  pool.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      res.end();
    } else {
      res.send(data.rows[0]);
    }
  });

};

const updateComment = (req, res) => {
  const songId = req.params.id;
  const commentId = req.params.comment_id;
  const query = {
    text: `UPDATE comments SET comment_text = 'newtext' WHERE id = $1 RETURNING id;`,
    values: [commentId]
  };
  pool.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      res.end();
    } else {
      res.sendStatus(200);
    }
  });

};

const deleteComment = (req, res) => {
  const songId = req.params.id;
  const commentId = req.params.comment_id;
  const query = {
    text: `DELETE FROM comments WHERE id = $1 RETURNING id`,
    values: [commentId]
  };
  pool.query(query, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      res.end();
    } else {
      res.sendStatus(200);
    }
  });

};

module.exports.getComments = getComments;
module.exports.postComment = postComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;