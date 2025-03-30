import { configDotenv } from "dotenv";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

configDotenv();

const { JWT_SECRET = "" } = process.env;

interface payload {
    id: string;
}

export class Encrypt {
    static passwordEncrypt(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    static generateToken(payload: payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    }
}
