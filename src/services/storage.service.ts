import { IEntity, IStorageModel } from '../models/models';
import { BrowserStorage } from '../libreris/browser-storage';

export class StorageService<T extends IEntity>
{
  private readonly key: string;
  private browserStorage = new BrowserStorage<IStorageModel<T>>(this.key);

  constructor(key: string)
  {
    this.key = key;
  }

  public addArray(items: T[]): void
  {
    const storage = this.browserStorage.getObject();

    if (storage === null)
    {
      const storageObj: IStorageModel<T> = {
        index: 0,
        list: [],
      };

      for (const item of items)
      {
        item.id = storageObj.index;
        storageObj.list.push(item);
        storageObj.index++;
      }
      this.browserStorage.setObject(storageObj);
      console.log(storageObj);

    }
    else
    {
      for (const item of items)
      {
        if (item.id === (null || undefined))
        {
          item.id = storage.index;
          storage.list.push(item);
          storage.index++;
        }
      }
      this.browserStorage.setObject(storage);
      console.log(storage);
    }
  }

  public getObj(): IStorageModel<T>
  {
    return this.browserStorage.getObject();
  }

  public clear(): void
  {
    this.browserStorage.clear();
  }
}