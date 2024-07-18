import jwt from "jsonwebtoken";
import { Constants } from "../Constants";
import { NextFunction, Request, Response } from "express";
import env from "../lib/env";
import { CustomError } from "../lib/utils";

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
          const cusErr = new CustomError(err.message, Constants.UNAUTHORIZED);
          return next(cusErr);
        }
        res.locals = decoded.user;
        next();
      });
    } else {
      const cusErr = new CustomError("Unautorized User", Constants.UNAUTHORIZED);
      next(cusErr);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(Constants.UNAUTHORIZED)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};
export default ValidateToken;

export const getUserFromToken = async (
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction
) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  try {
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        res.locals = decoded.user;
      });
    }
    next();
  } catch (error) {
    console.error(error);
    next();
  }
};
