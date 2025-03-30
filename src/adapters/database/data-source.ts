import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Cars, User } from "../../core/entity";

configDotenv();

const { DATABASE_URL, NODE_ENV } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    synchronize: NODE_ENV === "development" ? true : false,
    logging: NODE_ENV === "development" ? true : false,
    entities: [User, Cars],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});
