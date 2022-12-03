import { assertEquals } from "std/testing/asserts.ts";
import { IBonbon, IInputBonbon } from "src/models/bonbon.interface.ts";
import { BonbonService } from "src/services/bonbon.service.ts";

Deno.test(
  { name: "Bonbon CRUD" },
  async (t) => {
    const bonbonService = new BonbonService();

    const newBonbons: IInputBonbon[] = [
      {
        dbname: "Kitrat",
        popular: true,
        count: 10,
      },
      {
        dbname: "Fistbon",
        popular: false,
        count: 200,
      },
      {
        dbname: "Omeon",
        popular: true,
        count: 99,
      },
    ];

    const bonbonNameMap: { [name: string]: IBonbon } = {};

    await t.step("add bonbons", () => {
      const addedBonbons = bonbonService.add(newBonbons);

      const newIDs: string[] = [];
      for (const bonbon of addedBonbons) {
        bonbonNameMap[bonbon.dbname] = bonbon;
        newIDs.push(bonbon.id);
      }

      const currentBonbons = bonbonService.getByIDs(newIDs);

      assertEquals(currentBonbons.length, newBonbons.length);
    });

    await t.step("search bonbons", () => {
      // the search function is currently case sensitive
      const searchedBonbons = bonbonService.search("on");
      // Should contain {dbname: "Fistbon"} and {dbname: "Omeon"}
      assertEquals(searchedBonbons.length, 2);
    });

    await t.step("update bonbons", () => {
      const omeon = bonbonNameMap["Omeon"];

      omeon.count = 66666;

      const updatedBonbons = bonbonService.update([omeon]);

      assertEquals(updatedBonbons.length, 1);
      assertEquals(updatedBonbons[0].count, omeon.count);
    });

    await t.step("delete bonbons", () => {
      const kitrat = bonbonNameMap["Kitrat"];
      const fistbon = bonbonNameMap["Fistbon"];
      const deletedBonbons = bonbonService.deleteByIDs([kitrat.id, fistbon.id]);
      assertEquals(deletedBonbons.length, 2);
      const remainingBonbons = bonbonService.getAll();
      assertEquals(remainingBonbons.length, newBonbons.length - 2);
    });
  },
);
