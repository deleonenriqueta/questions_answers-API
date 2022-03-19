const redis = require('redis');
const redis_IP = process.env.REDIS_IP;
const redis_Password = process.env.REDIS_PASS;

module.exports = redis.createClient({
  url: `redis://default:${redis_Password}@${redis_IP}:6379`
});