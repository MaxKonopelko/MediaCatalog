import { IFilmsModel, IStorageModel } from '../models/models';
import { StorageService } from './storage.service';

class FilmServiceClass
{
  private storage = new StorageService<IFilmsModel>('film');

  public add(item: IFilmsModel): void
  {
    const list: IFilmsModel[]  = [];
    const filmList: IStorageModel<IFilmsModel> = this.storage.getObj();
    if (filmList !== null)
    {
      filmList.list.push(item);
    }
    list.push(item);
    this.storage.addArray(list);
  }

  public addArray(items: IFilmsModel[]): void
  {
    const filmList = this.storage.getObj();
    if (filmList !== null)
    {
      for (const image of items)
      {
        filmList.list.push(image);
      }
      this.storage.addArray(filmList.list);
    }
    else
    {
      const arrList: IFilmsModel[] = [];
      for (const image of items)
      {
        arrList.push(image);
      }
      this.storage.addArray(arrList);
    }
  }

  public clear(): void
  {
    this.storage.clear();
  }
}

export const FilmService = new FilmServiceClass();