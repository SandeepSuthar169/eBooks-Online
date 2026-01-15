import Redis from "ioredis";

const redis = new Redis({
    host: "localhost",
    port: Number(6379)
})


redis.on("connect", () => {
    console.log("connected to redis");
})

redis.on("error", (err) => {
    console.log("failed to connection error:" , err);    
})

export default redis