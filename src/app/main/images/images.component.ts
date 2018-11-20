import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { ImagesUrlComponent } from './images-url.component';
import { ImagesContentComponent } from './images-content.component';
import { ImagesListComponent } from './images-list.component';

@Component
export class ImagesComponent implements IComponent
{
  private _urlComponent = new ImagesUrlComponent();
  private _photoContentComponent = new ImagesContentComponent();
  private _photoList = new ImagesListComponent();

  public onInit(): void
  {
    document.getElementById('url-root').innerHTML += this._urlComponent.template();
    document.getElementById('photo-root').innerHTML += this._photoContentComponent.template();
    document.getElementById('photo-root').innerHTML += this._photoList.template();
  }

  public template(): string
  {
    return ` 
            <div class="photo-header">Photo Gallery</div>
            <div id="photo-data" class="photo-data"> 
                 <div id="url-root" class="url-root"></div>          
                 <div id="photo-root" class="photo-root"></div>     
            </div>
    `;
  }
}
