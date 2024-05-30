import { connect } from "http2";
import { config } from "./config/config";
import app from "./src/app";
import connectDB from "./config/db";

const startServer = async () => {
    await connectDB();

    const port = config.port || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port http://127.0.0.1:${port}`);
    });
};

startServer();
