import { IMusicModel, IStorageModel } from '../models/models';
import { BrowserStorage } from '../libreris/browser-storage';

export class StorageService
{
  private browserStorage = new BrowserStorage<IStorageModel>('music');

  public addMusic(items: IMusicModel[]): void
  {
    const musicStorage = this.browserStorage.getObject();

    if (musicStorage === null)
    {
      const storageObj: IStorageModel = {
        index: 0,
        musicList: [],
      };

      for (const music of items)
      {
        music.id = storageObj.index;
        storageObj.musicList.push(music);
        storageObj.index++;
      }
      this.browserStorage.setObject(storageObj);
      console.log(storageObj);

    }
  else
    {
      for (const music of items)
      {
        if (music.id === (null || undefined))
        {
          music.id = musicStorage.index;
          musicStorage.musicList.push(music);
          musicStorage.index++;
        }
      }
      this.browserStorage.setObject(musicStorage);
      console.log(musicStorage);
    }
  }

  public getObj(): IStorageModel
  {
    return this.browserStorage.getObject();
  }

  public clear(): void
  {
    this.browserStorage.clear();
  }
}