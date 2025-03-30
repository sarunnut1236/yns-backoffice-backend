import { configDotenv } from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

configDotenv();

export class Middleware {
    static async verifyToken(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const header = request.headers["authorization"];

        if (!header) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        const token = header.split(" ")[1];

        if (!token) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        if (!decoded) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        //@ts-expect-error
        request["currentUser"] = decoded;

        next();
    }

    static async errorHandler(
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        console.error(`Error: ${error.message}`);
        return response.status(500).json({ message: "Internal server error" });
    }
}
