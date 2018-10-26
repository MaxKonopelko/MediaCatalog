import { IImageModel } from '../models/models';
import { StorageService } from './storage.service';

class ImageServiceClass
{
  private storage = new StorageService<IImageModel>('image');

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

  public clear(): void
  {
    this.storage.clear();
  }
}

export const ImageService = new ImageServiceClass();