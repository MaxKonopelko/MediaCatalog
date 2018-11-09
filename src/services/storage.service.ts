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

  public getById(id: number): T
  {
    const objList: T[] = this.getObj();
    return objList.find(x => x.id === id);
  }

  public getObj(): T[]
  {
    const browserStorageData = this.browserStorage.getObject();
    return browserStorageData ? browserStorageData.list : [];
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
    }
  }

  public removeById(id: number): void
  {
    const storageObj = this.browserStorage.getObject();
    const index = storageObj.list.findIndex(x => (x.id === id));
    storageObj.list.splice(index, 1);

    this.clear();
    this.browserStorage.setObject(storageObj);
  }

  public clear(): void
  {
    this.browserStorage.clear();
  }
}