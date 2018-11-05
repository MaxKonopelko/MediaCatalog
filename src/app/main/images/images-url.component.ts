import { Component } from '../../../libreris/component';
import { ImagesListComponent } from './images-list.component';
import { IComponent } from '../../types';
import { ImageService } from '../../../services/image.service';

@Component
export class ImagesUrlComponent implements IComponent
{
  private _photoList = new ImagesListComponent();

  public onInit(): void
  {
    document.getElementById('url-photo').addEventListener('change', this.handleChange);
    document.getElementById('form-image').addEventListener('submit', this.handleSubmit);
  }

  public handleChange = () =>
  {
    document.getElementById('image')['src'] = document.getElementById('url-photo')['value'];
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

    ImageService.add(image);
    this._photoList.refresh();
    this._photoList.resetForm();
  };

  public template(): string
  {
    return `
               <div>  
                    <div>
                        <form id="form-image">
                              <!--<label for="fname">URL IMAGE </label>-->
                              <input type="text" id="url-photo" placeholder="Url image..">
                              <input type="text" id="url-name" value="" placeholder="Image name..">                    
                              <input type="submit" id="submit" value="Save">
                        </form>
                    </div>
               </div>    
    `;
  }
}