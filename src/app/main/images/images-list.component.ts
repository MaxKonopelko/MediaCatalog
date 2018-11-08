import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';
import { ImagesContentComponent } from './images-content.component';

@Component
export class ImagesListComponent implements IComponent
{
  private imagesContentComponent = new ImagesContentComponent();

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
                <span id="photo-span" data-id=${image.id} class="photo-span" ><strong>Photo:  </strong> ${image.name}
                </span>
                <i id='fa-close' class="fa fa-close" data-id=${image.id} style="font-size:24px"></i>
             </li>
      `;
    });
    photos.innerHTML = str;

    this.addLiClickHandler(photos);
    this.addIClickHandler(photos);
  }

  private addLiClickHandler = (photos: HTMLElement) =>
  {
    const liCollection = photos.querySelectorAll('span');
    const listArray = Array.from(liCollection);

    listArray.forEach(spanElement =>
    {
      spanElement.addEventListener('click', () =>
      {
        const id = parseInt(spanElement.dataset.id);
        this.imagesContentComponent.showImageById(id);
        this.refresh();
      });
    });
  };

  public addIClickHandler = (photos: HTMLElement) =>
  {
    const ICollection = photos.querySelectorAll('i');
    const listArray = Array.from(ICollection);

    listArray.forEach(iElement =>
    {
      iElement.addEventListener('click', () =>
      {
        const id = parseInt(iElement.dataset.id);
        ImageService.removeById(id);
        this.refresh();
        this.imagesContentComponent.clear();
      });
    });
  };

  public template(): string
  {
    return `
              <div class="photo-list">
                     <ol class="photos" id="photos"></ol>
               </div>       
            `;
  }
}
