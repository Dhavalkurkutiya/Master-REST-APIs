import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Failed to connect to database", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from database");
        });

        await mongoose.connect(config.databaseUrl as string);
    } catch (err) {
        console.error("Faild to connect to database", err);
        process.exit(1);
    }
};

export default connectDB;
