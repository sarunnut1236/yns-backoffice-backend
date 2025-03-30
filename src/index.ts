import { configDotenv } from "dotenv";
import * as express from "express";
import * as cors from "cors";
import { Middleware } from "./adapters/http/middleware/middleware";
import router from "./adapters/http/routes/user.routes";
import { carRoutes } from "./adapters/http/routes";
import { AppDataSource } from "./adapters/database/data-source";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(Middleware.errorHandler);
app.use("/auth", router);
app.use("/api", carRoutes);
app.get("*", (request: express.Request, response: express.Response) => {
    response.status(404).json({ message: "Page not found" });
});
AppDataSource.initialize()
    .then(() => {
        console.log(`Database connection established successfully`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
