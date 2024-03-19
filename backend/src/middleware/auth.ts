import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    //TS declaration that extends global namespace
    namespace Express {
        // This defines a namespace Express to extend the Express framework's types.
        interface Request {
            userId: string; //This allows you to attach the decoded user ID from the JWT to the request object
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]; //extracts jwt from auth_token
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        // If verification succeeds, extract the user ID and assign it to req.userId
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};

export default verifyToken;
