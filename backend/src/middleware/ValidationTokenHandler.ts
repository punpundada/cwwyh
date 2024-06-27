import jwt from "jsonwebtoken";
import { Constants } from "../Constants";
import { NextFunction, Request, Response } from "express";
import { ReqUser, TokenUser } from "../types/user";
import env from "../lib/env";

const ValidateToken = async (
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction
) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  try {
    if (typeof authHeader !== "string") return res.sendStatus(404);
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(Constants.UNAUTHORIZED)
            .json({ isSuccess: false, data: { message: err.message } });
        }
        res.locals.user = decoded.user;
        next();
      });
    } else {
      return res
        .status(Constants.UNAUTHORIZED)
        .json({ isSuccess: false, data: { message: "Unautorized User" } });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(Constants.UNAUTHORIZED)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

declare global {
  namespace Express {
    interface Locals {
      user: TokenUser | null;
    }
  }
}

export default ValidateToken;
