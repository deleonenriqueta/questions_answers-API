const client = require('./redis.js');
const db = require('./database/indexDB.js');

(async () => {
  console.log('connecting client')
  await client.connect();
})();

client.on('error', (err) => console.log('Redis Client Error: ', err));

const randomProduct = () => {
  const idStart = 700000;
  const idEnd = 1000011;
  return ((Math.floor(Math.random() * (idEnd - idStart))) + idStart);
}

const cacheValue = async () => {
  const randomId = Number(randomProduct());
  const randomValue = await db.allData(randomId);
  await client.set(randomId, randomValue);
}
