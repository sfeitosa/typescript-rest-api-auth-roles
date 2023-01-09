import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize()
  .then(() => {
    const app = express();

    const options: cors.CorsOptions = {
      exposedHeaders: ["X-Total-Count", "refreshed-token"],
    };

    app.use(cors(options));
    app.use(express.json());

    app.use("/", routes);

    return app.listen(process.env.APP_PORT, () => {
      console.log("Server started on port " + process.env.APP_PORT);
    });
  })
  .catch((error) => console.log(error));
