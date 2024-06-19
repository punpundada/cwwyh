import jwt from "jsonwebtoken";
import { Constants } from "../Constants";
import { NextFunction, Request, Response } from "express";
import { ReqUser } from "../types/user";
import env from "../lib/env";

const ValidateToken = async (req:Request<any,any,ReqUser<Record<string,unknown>>>, res:Response, next:NextFunction) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  try {
    if(typeof authHeader !== 'string')return res.sendStatus(404);
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(Constants.UNAUTHORIZED)
            .json({ isSuccess: false, data: { message: err.message } });
        }
        req.body.reqBody = req.body;
        req.body.user = decoded.user;
        next();
      });
    } else {
      return res
        .status(Constants.UNAUTHORIZED)
        .json({ isSuccess: false, data: { message: "Unautorized User" } });
    }
  } catch (error) {
    console.error(error)
    return res
      .status(Constants.UNAUTHORIZED)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

export default ValidateToken;
