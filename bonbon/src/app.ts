import { Application, Router } from "oak";
import { APIController } from "./controllers/apiController.ts";

class App {
  private app = new Application();
  private host = "0.0.0.0";
  private port = 3000;
  private router = new Router();

  private apiController = new APIController();

  constructor() {
    // Activate readiness probe endpoint and subroutes
    this.router
      .use(
        "/api",
        this.apiController.router.routes(),
        this.apiController.router.allowedMethods(),
      );

    this.app.use(this.router.routes())
      .use(this.router.allowedMethods());

    this.app.addEventListener("listen", ({ secure, hostname, port }) => {
      const protocol = secure ? "https://" : "http://";
      const url = `${protocol}${hostname ?? "localhost"}:${port}`;
      console.log(`App: running on ${url}`);
    });

    this.app.listen(
      {
        hostname: this.host,
        port: this.port,
      },
    );
  }
}

export default new App();
