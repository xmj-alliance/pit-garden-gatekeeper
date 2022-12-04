import { AbstractController } from "./abstractController.ts";

import { BonbonController } from "./bonbonController.ts";

export class APIController extends AbstractController {
  private bonbonController = new BonbonController();
  constructor() {
    super();
    this.setupSubRouting();
  }

  protected override setupRouting(): void {
    this.router.get("/", (ctx) => {
      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "API works!",
      };
    });
  }

  protected setupSubRouting(): void {
    this.router
      .use(
        "/bonbons",
        this.bonbonController.router.routes(),
        this.bonbonController.router.allowedMethods(),
      );
  }
}
