import { IEntity } from '../models/models';
import { BrowserStorage } from '../libreris/browser-storage';

interface IStorageModel<TModel>
{
  index: number;
  list: TModel[];
}

export class StorageService<T extends IEntity>
{
  private readonly browserStorage: BrowserStorage<IStorageModel<T>>;

  constructor(key: string)
  {
    this.browserStorage = new BrowserStorage<IStorageModel<T>>(key);
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

  public getObj(): T[]
  {
    const browserStorageData = this.browserStorage.getObject();
    return browserStorageData ?  browserStorageData.list : [];
  }

  public clear(): void
  {
    this.browserStorage.clear();
  }
}