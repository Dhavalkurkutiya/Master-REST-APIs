import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
        const error = createHttpError(400, "User already exists");
        return next(error);
    }

    // Passwor hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUSer = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    // Token ganeration
    const token = sign({ sub: newUSer._id }, config.jwtSecret as string,{ expiresIn: "1h" , algorithm: "HS256"});

    // Processing

    // Response

    res.json({ axxessToken: token});
};

export { createUser };
