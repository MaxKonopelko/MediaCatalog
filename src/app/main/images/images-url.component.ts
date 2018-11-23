import { Component } from '../../../libreris/component';
import { ImagesListComponent } from './images-list.component';
import { IComponent } from '../../types';
import { ImagesContentComponent } from './images-content.component';
import { formContent } from '../../controls/controls';

@Component
export class ImagesUrlComponent implements IComponent
{
  private _photoList = new ImagesListComponent();
  private _imagesContentComponent = new ImagesContentComponent();

  public onInit(): void
  {
    document.getElementById('url-photo').addEventListener('change', this.handleChange);
  }

  private handleChange = () =>
  {
    const link = document.getElementById('url-photo')['value'];
    this._imagesContentComponent.showImageByLink(link);
  };

  private handleSubmit = (event: Event) =>
  {
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

  private resetForm(): void
  {
    document.getElementById('url-photo')['value'] = '';
    document.getElementById('url-name')['value'] = '';
  }

  public template(): string
  {
    const content = `                   
                      <div class="col-3">
                      <input class="effect-7" id="url-photo" type="text" placeholder="Url image.." required pattern="https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif)">
                          <span class="focus-border">
                            <i></i>
                          </span>
                      </div>
                      <div class="col-3">
                          <input class="effect-7" id="url-name"  type="text" placeholder="Image name.." required>
                            <span class="focus-border">
                              <i></i>
                            </span>
                      </div>
                      <div class="col-3">
                        <input class="effect-7" id="submit" type="submit" value="Save" required>
                          <span class="focus-border">
                            <i></i>
                          </span>
                      </div>      
                   `;
    return formContent(content, this.handleSubmit);
  }
}