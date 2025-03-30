import { configDotenv } from "dotenv";
import * as express from "express";
import * as cors from "cors";
import { Middleware } from "./adapters/http/middleware/middleware";
import { AppDataSource } from "./adapters/database/data-source";
import { campDayRoutes, campRoutes, registrationRoutes, userRoutes } from "./adapters/http/routes";
import helmet from "helmet";
import hpp = require("hpp");
import rateLimit from "express-rate-limit";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes"
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply security middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(limiter);
app.use(Middleware.errorHandler);
app.use("/api", userRoutes);
app.use("/api", campRoutes);
app.use("/api", campDayRoutes);
app.use("/api", registrationRoutes);
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
