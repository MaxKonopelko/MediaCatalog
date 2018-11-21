import { IMusicModel } from '../models/models';
import { StorageService } from './storage.service';
import { musicUrlIsValid } from '../libreris/common';

class MusicServiceClass
{
  private storage = new StorageService<IMusicModel>('music');

  public getId(id: number): IMusicModel
  {
    return this.storage.getById(id);
  }

  public get(): IMusicModel[]
  {
    return this.storage.getObj();
  }

  public add(item: IMusicModel): void
  {
      const musicList: IMusicModel[] = this.storage.getObj();
      musicList.push(item);
      this.storage.addArray(musicList);

      //const element = document.getElementById('url-music');
      //element.style.border = '2px solid crimson';
      //element.style.transition = '1s';
      //alert('Music Url Invalid');
      // TODO

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

  public removeById(id: number): void
  {
    this.storage.removeById(id);
  }

  public clear(): void
  {
    this.storage.clear();
  }
}

export const MusicService = new MusicServiceClass();