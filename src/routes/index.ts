import { Router } from "express";
import auth from "./auth/auth";

const routes = Router();

routes.use("/auth", auth);

export default routes;
