import { IMusicModel } from '../models/models';
import { StorageService } from './storage.service';

class MusicServiceClass
{
  private storage = new StorageService<IMusicModel>('music');

  public add(item: IMusicModel): void
  {
    const list: IMusicModel[]  = [];
    const musicList = this.storage.getObj();

    if (musicList !== null)
    {
      musicList.list.push(item);
    }
    list.push(item);
    this.storage.addArray(list);
  }

  public addArray(items: IMusicModel[]): void
  {
    const musicList = this.storage.getObj();
    if (musicList !== null)
    {
      for (const music of items)
      {
        musicList.list.push(music);
      }
      this.storage.addArray(musicList.list);
    }
    else
    {
      const arrList: IMusicModel[] = [];
      for (const music of items)
      {
        arrList.push(music);
      }
      this.storage.addArray(arrList);
    }
  }

  public clear(): void
  {
    this.storage.clear();
  }
}

export const MusicService = new MusicServiceClass();