import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1000,
  duration: '1s'
};

const productIdStart = 700000;
const productIdEnd = 1000011;


export default function () {
  http.get(`http://localhost:8080/qa/questions?product_id=${Math.floor((Math.random()*productIdEnd - productIdStart) + productIdStart)}`);
  sleep(1);
}