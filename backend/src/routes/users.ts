import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

//get the current login user
router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
});

// /api/users/register
router.post(
    "/register",
    [
        check("firstName", "First Name is required").isString(),
        check("lastName", "Last Name is required").isString(),
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Password with 6 or more characters required"
        ).isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        (async () => {
            try {
                let user = await User.findOne({
                    email: req.body.email,
                });

                if (user) {
                    return res
                        .status(400)
                        .json({ message: "user already exists" });
                }

                user = new User(req.body);

                //before we save password to db, we have to encrypt it
                await user.save();

                //jwt
                //sign method in JWT is used to generate a new token based on a payload (usually containing user data or other information) and a secret key
                const token = jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET_KEY as string,
                    {
                        expiresIn: "1d",
                    }
                );

                res.cookie("auth_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 86400000, //24 hours (24 * 60 * 60 * 1000 = 86400000 milliseconds)
                });
                return res.status(200).send({ message: "User registered OK" });
            } catch (error: unknown) {
                console.log((error as Error).message);
                res.status(500).send({ message: "server error" });
            }
        })();
    }
);

export default router;
