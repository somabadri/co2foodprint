import express from "express"
import cors from "cors"
import routes from "./api/routes.js"

const app = express()

/*sets everything up with the routes to talk with the server*/
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", routes);
app.use("*", (req,res) => res.status(404).json({ error: "not found"}));

export default app;
