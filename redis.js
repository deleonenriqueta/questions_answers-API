const redis = require('redis');
const redis_IP = process.env.REDIS_IP;
const redis_Password = process.env.REDIS_PASS;

module.exports = redis.createClient({
  url: `redis://@${redis_IP}:6379`
});