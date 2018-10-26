import { IMusicModel } from '../models/models';
import { StorageService } from './storage.service';

class MusicServiceClass
{
  private storage = new StorageService<IMusicModel>('music');

  public add(item: IMusicModel): void
  {
    const musicList: IMusicModel[] = this.storage.getObj();
    musicList.push(item);
    this.storage.addArray(musicList);
  }

  public addArray(items: IMusicModel[]): void
  {
    const musicList = this.storage.getObj();
    for (const music of items)
    {
      musicList.push(music);
    }
    this.storage.addArray(musicList);
  }

  public clear(): void
  {
    this.storage.clear();
  }
}

export const MusicService = new MusicServiceClass();