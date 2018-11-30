import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';
import { urlDefaultImage } from '../../../libreris/common';

@Component
export class ImagesContentComponent implements IComponent
{
  public showImageById(id: number): void
  {
    document.getElementById('image')['src'] = ImageService.getById(id).link;
  }

  public showImageByLink(link: string): void
  {
    document.getElementById('image')['src'] = link;
  }

  public clear(): void
  {
    document.getElementById('image')['src'] = urlDefaultImage;
  }

  public template(): string
  {
    return `
              <div class= "photo-content">  
                     <div class="photo">
                        <div class="photo-size">                                       
                            <img class="image" id="image" src="${urlDefaultImage}">
                        </div>
                     </div>
              </div>
    `;
  }
}