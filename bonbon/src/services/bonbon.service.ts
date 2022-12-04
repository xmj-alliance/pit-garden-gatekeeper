import { IBonbon, IInputBonbon } from "src/models/bonbon.interface.ts";
import { MockCRUDService } from "./mockCrud.service.ts";

export class BonbonService extends MockCRUDService<IBonbon> {
  public override async add(newItems: IInputBonbon[]) {
    const addingItems: IBonbon[] = [];

    for (const item of newItems) {
      const randomID = crypto.randomUUID();
      const addingItem: IBonbon = {
        id: randomID,
        dbname: item.dbname || `random-${randomID}`,
        popular: item.popular || false,
        count: item.count || 0,
      };
      addingItems.push(addingItem);
    }

    await super.add(addingItems);

    return addingItems;
  }

  public override async search(query: string) {
    return await super.search(
      query,
      ["id", "dbname"],
    );
  }

  public override async update(changedItems: IInputBonbon[]) {
    const updatingItems = changedItems as IBonbon[];
    return await super.update(updatingItems);
  }
}
