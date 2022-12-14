import { IBaseObject } from "src/models/base.interface.ts";

export abstract class MockCRUDService<T extends IBaseObject> {
  private items: T[] = [];

  protected add(newItems: T[]) {
    const addingItems: T[] = [];
    this.items = this.items.concat(newItems);
    return Promise.resolve(addingItems);
  }

  public getByIDs = (searchIDs: string[]) => {
    const loadedItems = this.items.filter((ele) => searchIDs.includes(ele.id));
    return Promise.resolve(loadedItems);
  };

  public getAll = () => {
    return Promise.resolve(this.items);
  };

  protected search(query: string, fields: string[]) {
    if (this.items.length <= 0) {
      return [] as T[];
    }

    // do a whole search

    const resultCollection: T[][] = [];

    for (const field of fields) {
      const filterResult = this.items.filter(
        (ele) => {
          const itemField = ele[field];
          if (!(typeof itemField === "string" || itemField instanceof String)) {
            return false;
          }
          return itemField.includes(query);
        },
      );

      resultCollection.push(filterResult);
    }

    // remove duplicate IDs
    const itemMap: { [id: string]: T } = {};

    for (const fieldResults of resultCollection) {
      for (const item of fieldResults) {
        if (!itemMap[item.id]) {
          itemMap[item.id] = item;
        }
      }
    }

    return Promise.resolve(
      Object.values(itemMap),
    );
  }

  protected update(changedItems: T[]) {
    const updatedItems: T[] = [];

    for (const item of changedItems) {
      const existingItemIndex = this.items.findIndex((ele) =>
        ele.id === item.id
      );
      if (existingItemIndex < 0) {
        continue;
      }

      this.items.splice(existingItemIndex, 1, item);

      updatedItems.push(item);
    }
    return Promise.resolve(
      updatedItems,
    );
  }

  public deleteByIDs = (searchIDs: string[]) => {
    let deletedItems: T[] = [];

    for (const id of searchIDs) {
      const existingItemIndex = this.items.findIndex((ele) => ele.id === id);
      if (existingItemIndex < 0) {
        continue;
      }
      const deletingItems = this.items.splice(existingItemIndex, 1);
      deletedItems = deletedItems.concat(deletingItems);
    }

    return Promise.resolve(
      deletedItems,
    );
  };
}
