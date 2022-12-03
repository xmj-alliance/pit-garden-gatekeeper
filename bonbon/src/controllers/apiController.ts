import { AbstractController } from "./abstractController.ts";

export class APIController extends AbstractController {
  protected override setupRouting(): void {
    this.router.get("/", (ctx) => {
      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "API works!",
      };
    });
  }
}
