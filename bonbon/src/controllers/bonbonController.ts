import { AbstractController } from "./abstractController.ts";

export class BonbonController extends AbstractController {
  protected override setupRouting(): void {
    this.router.get("/", (ctx) => {
      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "Bonbon works!",
      };
    });
  }
}
