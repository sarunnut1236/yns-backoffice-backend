import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";

configDotenv();

const { DATABASE_URL, NODE_ENV } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
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
