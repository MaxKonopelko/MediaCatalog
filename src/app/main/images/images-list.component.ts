import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';
import { ImagesContentComponent } from './images-content.component';

@Component
export class ImagesListComponent implements IComponent
{
  private imagesContentComponent = new ImagesContentComponent;

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
        <li id="photo-li" class="photo-li" data-id=${image.id}>
          <strong>Photo:  </strong>
          <span>${image.name}</span>
          
        </li>
      `;
    });
    photos.innerHTML = str;

    this.liClickHandler(photos);
  }

  private liClickHandler(photos: HTMLElement): void
  {
    const arrLi = photos.querySelectorAll('li');

    Array.from(arrLi).forEach((el, index) =>
    {
      el.addEventListener('click', () => this.imagesContentComponent.changeImage(index));
    });
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
