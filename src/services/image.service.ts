import { IImageModel, IStorageModel } from '../models/models';
import { StorageService } from './storage.service';

class ImageServiceClass
{
  private storage = new StorageService<IImageModel>('image');

  public add(item: IImageModel): void
  {
    const list: IImageModel[]  = [];
    const imageList: IStorageModel<IImageModel> = this.storage.getObj();
    if (imageList !== null)
    {
      imageList.list.push(item);
    }
    list.push(item);
    this.storage.addArray(list);
  }

  public addArray(items: IImageModel[]): void
  {
    const imageList = this.storage.getObj();
    if (imageList !== null)
    {
      for (const image of items)
      {
        imageList.list.push(image);
      }
      this.storage.addArray(imageList.list);
    }
    else
    {
      const arrList: IImageModel[] = [];
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

export const ImageService = new ImageServiceClass();