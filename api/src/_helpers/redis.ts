import redis from 'redis';
import bluebird from 'bluebird';
import {AsyncRedisClient} from "../_types";
bluebird.promisifyAll(redis.RedisClient.prototype);

export const redisClient: AsyncRedisClient = redis.createClient({
    host: 'redis',
    port: 6379,
    password: '123@!23a'
})

redisClient.on('connect', () => console.log('Connected to Redis') )