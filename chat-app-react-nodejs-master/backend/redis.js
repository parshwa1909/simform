const express = require('express');
const redis = require('redis');
const redisClient = redis.createClient({
  password: 'Psg8460887627',
});

const app = express();

app.use((req, res, next) => {
  const key = req.url;

  redisClient.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
});

app.get('/data', (req, res) => {
  const data = fetchData();
  redisClient.setex(req.url, 3600, JSON.stringify(data));
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
