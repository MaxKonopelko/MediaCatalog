import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';

@Component
export class ImagesListComponent implements IComponent
{
  public onInit(): void
  {
    this.refresh();
  }

  public refresh(): void
  {
    const images = ImageService.get();
    const photos = document.getElementById('photos');
    let str = '';

    images.forEach(image =>
    {
      str += `
        <li class="photo-li"><strong>Photo: Id ${image.id}</strong> Name: ${image.name}</li>
      `;
    });
    photos.innerHTML = str;
  }

  public resetForm(): void
  {
    document.getElementById('url-photo')['value'] = '';
    document.getElementById('url-name')['value'] = '';
  }

  public template(): string
  {
    return `
              <div class="photo-list">
                     <ol class="photos" id="photos"></ol>
               </div>       
            `;
  }
}
