import { Component } from '../../../libreris/component';
import { ImagesListComponent } from './images-list.component';
import { IComponent } from '../../types';
import { ImagesContentComponent } from './images-content.component';

@Component
export class ImagesUrlComponent implements IComponent
{
  private _photoList = new ImagesListComponent();
  private _imagesContentComponent = new ImagesContentComponent();

  public onInit(): void
  {
    document.getElementById('url-photo').addEventListener('change', this.handleChange);
    document.getElementById('form-image').addEventListener('submit', this.handleSubmit);
  }

  public handleChange = () =>
  {
    const value = document.getElementById('url-photo')['value'];
    this._imagesContentComponent.showImageByLink(value);
  };

  public handleSubmit = (event: Event) =>
  {
    event.preventDefault();
    const urlPhoto = document.getElementById('url-photo');

    const image = {
      link: urlPhoto['value'],
      name: document.getElementById('url-name')['value'],
      authorFullName: '',
      top: '',
    };

    this._photoList.add(image);
    this.resetForm();
  };

  public resetForm(): void
  {
    document.getElementById('url-photo')['value'] = '';
    document.getElementById('url-name')['value'] = '';
  }

  public template(): string
  {
    return `        
                    <div class="form-url">
                        <form id="form-image" class="form">
                              <div class="col-3">
                              <input class="effect-7" id="url-photo" type="text" placeholder="Url image..">
                                  <span class="focus-border">
                                    <i></i>
                                  </span>
                              </div>
                              <div class="col-3">
                                  <input class="effect-7" id="url-name"  type="text" placeholder="Image name..">
                                    <span class="focus-border">
                                      <i></i>
                                    </span>
                              </div>
                              <div class="col-3">
                                <input class="effect-7" id="submit" type="submit" value="Save">
                                  <span class="focus-border">
                                    <i></i>
                                  </span>
                              </div>
                        </form>
                    </div>          
    `;
  }
}