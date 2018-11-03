import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';

@Component
export class ImagesComponent implements IComponent
{
  public onInit(): void
  {
    const el = document.getElementById('photo-data');
    console.warn('onInit el', el);
  }

  public template(): string
  {
    return ` 
            <div class="photo-header">Photo</div>
            <div id="photo-data" class="photo-data"></div>
    `;
  }
}
