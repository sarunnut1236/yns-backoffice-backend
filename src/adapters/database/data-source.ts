import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";

configDotenv();

const { DATABASE_URL, NODE_ENV, DATABASE_URL_PROD } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: NODE_ENV === "production" ? DATABASE_URL_PROD : DATABASE_URL,
    synchronize: NODE_ENV === "development" ? true : false,
    logging: NODE_ENV === "development" ? true : false,
    entities: ["./src/core/entity/index.ts"],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});
