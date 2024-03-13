import express from 'express';
import {Application} from 'express';
import cors from 'cors';

import { connectToDatabase } from "./services/database.service";
import { productsRouter } from "./routes/products.router";

const app: Application = express();
const port: number = 3000;

connectToDatabase()
    .then(() => {
        app.use(cors());
        app.use("/api/v1/products", productsRouter);
        app.use("*", (req, res) => res.status(404).json({error: "not found"}))
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exitCode = 1;
    });