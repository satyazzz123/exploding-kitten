import { Client } from "redis-om";
// import dotenv from "dotenv";
// dotenv.config();

const redisURL =`redis://127.0.0.1:6379` ;

/* create and open the Redis OM Client */
const createClient = async () => {
   const client = new Client();
   await client.open(redisURL);
   return client;
}

export default createClient();
