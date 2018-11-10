import { IImageModel } from '../models/models';
import { StorageService } from './storage.service';
import { imageUrlIsValid } from '../libreris/common';

class ImageServiceClass
{
  private storage = new StorageService<IImageModel>('image');

  public getId(id: number): IImageModel
  {
    return this.storage.getById(id);
  }

  public get(): IImageModel[]
  {
    return this.storage.getObj();
  }

  public add(item: IImageModel): void
  {
    const element = document.getElementById('url-photo');

    if (item.name.length > 0 && imageUrlIsValid(item.link))
    {
      element.style.border = '1px solid #ccc';

      const imageList: IImageModel[] = this.storage.getObj();
      imageList.push(item);
      this.storage.addArray(imageList);
    }
    else
    {
      element.style.border = '2px solid crimson';
      element.style.transition = '1s';

      alert('Image Url Invalid');
      // TODO
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