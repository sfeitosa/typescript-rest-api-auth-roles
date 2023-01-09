import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers["authorization"];

  if (!authHeader) {
    res.status(401).send();
    return;
  }

  const token = authHeader.split(" ")[1];
  const tokenSecret = process.env.TOKEN_SECRET ?? "";
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, tokenSecret, {
    expiresIn: "1h",
  });
  res.append("refreshed-token", newToken);

  next();
};
