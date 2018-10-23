import { IMusicModel, IStorageModel } from '../models/models';
import { StorageService } from './storage.service';

class MusicServiceClass
{
  private storage = new StorageService();

  public add(item: IMusicModel): void
  {
    const list: IMusicModel[] = [];
    const musicList: IStorageModel = this.storage.getObj();

    if (musicList !== null)
    {
      // TODO
      for (const music of musicList.musicList)
      {
        list.push(music);
      }
    }
    list.push(item);
    this.storage.addMusic(list);
  }

  public addArray(items: IMusicModel[]): void
  {
    const musicList = this.storage.getObj();
    if (musicList !== null)
    {
      for (const music of items)
      {
        musicList.musicList.push(music);
      }
      this.storage.addMusic(musicList.musicList);
    }
    else
    {
      const arrList: IMusicModel[] = [];
      for (const music of items)
      {
        arrList.push(music);
      }
      this.storage.addMusic(arrList);
    }
  }

  // public getAll(): object
  // {
  //   return this.storage.getObj;
  // }

  public clear(): void
  {
    this.storage.clear();
  }
}

export const MusicService = new MusicServiceClass();
