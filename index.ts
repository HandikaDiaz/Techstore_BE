import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import routers from "./src/router/route";
dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);
app.get("/", (req, res: express.Response) => {res.send("Hello World!")});

app.listen(port, () => console.log("Server is running on port 5000"));