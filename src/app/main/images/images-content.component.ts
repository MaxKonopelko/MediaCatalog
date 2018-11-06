import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';

@Component
export class ImagesContentComponent implements IComponent
{

  public changeImage(index: number): void
  {
    const images = ImageService.get();
    images.forEach(function (image)
    {
      if (image.id === index)
      {
        document.getElementById('image')['src'] = image.link;
      }
    });

  }

  public template(): string
  {
    return `
              <div class="photo-root">  
                     <div class="photo">
                        <div class="photo-size">                                       
                            <img class="image" id="image" src="http://placehold.it/200x200">
                        </div>
                     </div>
              </div>
    `;
  }
}