import { IBonbon, IInputBonbon } from "src/models/bonbon.interface.ts";
import { MockCRUDService } from "./mockCrud.service.ts";

export class BonbonService extends MockCRUDService<IBonbon> {
  add(newItems: IInputBonbon[]) {
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

    super.add(addingItems);

    return addingItems;
  }

  search(query: string) {
    return super.search(
      query,
      ["id", "dbname"],
    );
  }

  update(changedItems: IInputBonbon[]) {
    const updatingItems = changedItems as IBonbon[];
    return super.update(updatingItems);
  }
}
