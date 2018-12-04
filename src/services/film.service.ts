import { IFilmsModel, IImageModel } from '../models/models';
import { StorageService } from './storage.service';

class FilmServiceClass
{
  private storage = new StorageService<IFilmsModel>('film');

  public getById(id: number): IFilmsModel
  {
    return this.storage.getById(id);
  }

  public getList(): IFilmsModel[]
  {
    return this.storage.getObj();
  }

  public add(item: IFilmsModel): void
  {
    const filmList: IFilmsModel[] = this.storage.getObj();
    filmList.push(item);
    this.storage.addArray(filmList);
  }

  public addArray(items: IFilmsModel[]): void
  {
    const filmList = this.storage.getObj();
    for (const image of items)
    {
      filmList.push(image);
    }
    this.storage.addArray(filmList);
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

export const FilmService = new FilmServiceClass();