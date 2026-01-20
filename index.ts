import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import routers from "./src/router/route";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config({ path: '.env' });

const DB = process.env.DATABASE_URL;
const client = new MongoClient(DB as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://techstore-fe.vercel.app/", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);
app.get("/", (req, res: express.Response) => { res.send("Hello World!") });

app.listen(port, () => console.log("Server is running on port 5000"));