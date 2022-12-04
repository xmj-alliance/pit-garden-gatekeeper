import { BonbonService } from "src/services/bonbon.service.ts";
import { IBonbon, IInputBonbon } from "src/models/bonbon.interface.ts";
import { AbstractController } from "./abstractController.ts";

export class BonbonController extends AbstractController {
  private bonbonService: BonbonService = new BonbonService();

  protected override setupRouting(): void {
    // get all
    this.router.get("/", async (ctx) => {
      const searchParams = ctx.request.url.searchParams;

      const searchToken = searchParams.get("q");

      let bonbons: IBonbon[];

      if (searchToken) {
        bonbons = await this.bonbonService.search(searchToken);
      } else {
        bonbons = await this.bonbonService.getAll();
      }

      ctx.response.status = 200;
      ctx.response.body = bonbons;
    });

    // add
    this.router.post("/", async (ctx) => {
      const ingressBonbons: any[] = await ctx.request.body().value;

      if (!Array.isArray(ingressBonbons)) {
        ctx.response.status = 400;
        ctx.response.body = {
          ok: false,
          message: "Request body should be an array",
          instances: null,
        };
        return;
      }

      const inputBonbons: IInputBonbon[] = this.inbound(ingressBonbons);

      const addedBonBons = await this.bonbonService.add(inputBonbons);

      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "Added",
        instances: addedBonBons,
      };
    });

    // update
    this.router.patch("/", async (ctx) => {
      const ingressBonbons: any[] = await ctx.request.body().value;

      if (!Array.isArray(ingressBonbons)) {
        ctx.response.status = 400;
        ctx.response.body = {
          ok: false,
          message: "Request body should be an array",
          instances: null,
        };
        return;
      }

      const inputBonbons: IInputBonbon[] = this.inbound(ingressBonbons);

      const updatedBonBons = await this.bonbonService.update(inputBonbons);

      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "Updated.",
        instances: updatedBonBons,
      };
    });

    // delete
    this.router.delete("/:id", async (ctx) => {
      const deletingID = ctx.params.id;

      if (!deletingID) {
        ctx.response.status = 400;
        ctx.response.body = {
          ok: false,
          message: "Deleting ID cannot be null",
        };
        return;
      }

      const deletedBonBons = await this.bonbonService.deleteByIDs([deletingID]);

      ctx.response.status = 200;
      ctx.response.body = {
        ok: true,
        message: "Deleted.",
        instances: deletedBonBons,
      };
    });
  }

  private inbound = (ingressBonbons: any[]) => {
    return ingressBonbons.map((ele) => ({
      id: ele.id,
      dbname: ele.dbname,
      popular: ele.popular,
      count: ele.count,
    } as IInputBonbon));
  };
}
