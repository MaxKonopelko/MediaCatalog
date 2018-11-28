import { IImageModel } from '../models/models';
import { StorageService } from './storage.service';

class ImageServiceClass
{
  private storage = new StorageService<IImageModel>('image');

  public getById(id: number): IImageModel
  {
    return this.storage.getById(id);
  }

  public getList(): IImageModel[]
  {
    return this.storage.getObj();
  }

  public add(item: IImageModel): void
  {
    const imageList: IImageModel[] = this.storage.getObj();
    imageList.push(item);
    this.storage.addArray(imageList);
  }

  public addArray(items: IImageModel[]): void
  {
    const imageList = this.storage.getObj();
    for (const image of items)
    {
      imageList.push(image);
    }
    this.storage.addArray(imageList);
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

export const ImageService = new ImageServiceClass();