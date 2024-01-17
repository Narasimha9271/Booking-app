import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ], async(req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

  (async ()=>{
    try {
      let user = await User.findOne({
        email: req.body.email,
      })
    
      if(user){
        return res
          .status(400)
          .json({message: "user already exists"})
      }
  
      user = new User(req.body);
  
      //before we save password to db, we have to encrypt it
      await user.save()
  
  
      //jwt
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
        maxAge: 86400000,
      });
      return res
        .status(200)
        .send({ message: "User registered OK" });
  
  
    } catch (error: unknown) {
      console.log((error as Error).message);
      res
        .status(500)
        .send({message: "server error"});
    }
  })()

})

export default router