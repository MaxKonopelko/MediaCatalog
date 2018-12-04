import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImageService } from '../../../services/image.service';
import { ImagesContentComponent } from './images-content.component';
import { IImageModel } from '../../../models/models';

@Component
export class ImagesListComponent implements IComponent
{
  private imagesContentComponent = new ImagesContentComponent();
  private activeId: number;
  private buffer: number;

  public onInit(): void
{
  this.refresh();
}

  public add(image: IImageModel): void
  {
    ImageService.add(image);
    this.refresh();
    this.activeId = this.buffer;
    this.activateElement();
  }

  private refresh(): void
  {
    const images = ImageService.getList();
    const photos = document.getElementById('photos');
    let str = '';

    images.forEach(image =>
    {
      this.buffer = image.id;
      str += `
             <li id="photo-li" class="photo-li" data-id=${image.id}>
                <span id="photo-span" class="photo-span" >
                    ${image.id}. Photo: ${image.name}
                </span>
                <i id='fa-close' class="fa fa-close" style="font-size:24px"></i>
             </li>
      `;
    });
    photos.innerHTML = str;

    this.addSpanClickHandler(photos);
    this.addIClickHandler(photos);
  }

  private addSpanClickHandler = (photos: HTMLElement) =>
  {
    const spanCollection = photos.querySelectorAll('span');
    const listArray = Array.from(spanCollection);

    listArray.forEach(spanElement =>
    {
      spanElement.addEventListener('click', () =>
      {
        const parent = spanElement.parentElement;
        const id = parseInt(parent.dataset.id);
        this.activeId = id;
        this.imagesContentComponent.showImageById(id);
        this.refresh();
        this.activateElement();
      });
    });
  };

  public activateElement = () =>
  {
    const liCollection = document.querySelectorAll('.photos li');
    const listLi = Array.from(liCollection);
    const liElem = listLi.find(le => parseInt(le.getAttribute('data-id')) === this.activeId);
    liElem.classList.add('newSpan');
  };

  public addIClickHandler = (photos: HTMLElement) =>
  {
    const ICollection = photos.querySelectorAll('i');
    const listArray = Array.from(ICollection);

    listArray.forEach(iElement =>
    {
      iElement.addEventListener('click', () =>
      {
        const parent = iElement.parentElement;
        const id = parseInt(parent.dataset.id);
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
                     <ul class="photos" id="photos"></ul>
               </div>       
            `;
  }
}
