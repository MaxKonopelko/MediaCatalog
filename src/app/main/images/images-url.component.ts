import { Component } from '../../../libreris/component';
import { ImagesListComponent } from './images-list.component';
import { IComponent } from '../../types';
import { ImagesContentComponent } from './images-content.component';
import { formContent } from '../../controls/controls';
import { IImageModel } from '../../../models/models';
import { Patterns } from '../../../libreris/common';

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

  private handleSubmit = (formValues: object) =>
  {
    const image: IImageModel = {
      link: formValues['url'],
      name: formValues['name'],
      authorFullName: '',
    };
    console.log('image', image);

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
    const content = ` <div class="flex">                    
                        <div class="col-3">
                        <input class="effect-7" id="url-photo" type="text" name="url" value="" placeholder="Url image.." required pattern="${Patterns.ImageUrl}">
                            <span class="focus-border">
                              <i></i>
                            </span>
                        </div>
                      </div>
                      <div class="flex">  
                        <div class="col-3">
                            <input class="effect-7" id="url-name"  type="text" name="name" value="" placeholder="Image name.." required pattern="${Patterns.Name}">
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
                      </div>
                   `;
    return formContent(content, this.handleSubmit);
  }
}