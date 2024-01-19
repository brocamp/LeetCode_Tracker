import Redis from "ioredis";

export const connection = new Redis(process.env.REDIS_CONNECTION!);
