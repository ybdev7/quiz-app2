import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

export class quizServer {
  private app: Express;
  private port: number;
  private quizUrl: string;

  constructor(port?: number) {
    this.app = express();
    this.port = port ? port : 80;
    this.quizUrl = "/quiz";

    this.init();
    this.initRoute();

    //any unknown paths should be handled by the client code
    this.app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
    });
  }

  public get = () => {
    return this.app;
  };

  private init() {
    this.app.use(express.json());
    //this.app.use("/", express.static(path.join(__dirname, "./dist/public")));
    this.app.use(express.static(path.join(__dirname, "../../../client/build")));

    //enable CORS
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
      );
      next();
    });
  }
  private initRoute() {
    this.app.use(this.quizUrl, require("./quiz_router"));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}
