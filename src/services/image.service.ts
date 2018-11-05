import { IImageModel } from '../models/models';
import { StorageService } from './storage.service';
import { imageUrlIsValid } from '../libreris/common';

class ImageServiceClass
{
  private storage = new StorageService<IImageModel>('image');

  public get(): IImageModel[]
  {
    return this.storage.getObj();
  }

  public add(item: IImageModel): void
  {
    if (item.name.length > 0 && imageUrlIsValid(item.link))
    {
      const imageList: IImageModel[] = this.storage.getObj();
      imageList.push(item);
      this.storage.addArray(imageList);
    }
    else
    {
      alert('Image Url Invalid');
    }
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