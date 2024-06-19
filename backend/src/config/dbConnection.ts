import mongoose  from "mongoose";
import env from "../lib/env";


const dbConnection = async()=>{
    try {
        const connect = await mongoose.connect(env.MONGODB_CONNECTION_STRING);
        console.log(
            `Database Connected`,
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default dbConnection;