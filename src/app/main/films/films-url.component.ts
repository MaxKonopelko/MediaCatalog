import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { Patterns } from '../../../libreris/common';
import { FilmsListComponent } from './films-list.component';
import { FilmsContentComponent } from './films-content.component';
import { formContent } from '../../controls/controls';
import { IFilmsModel } from '../../../models/models';

@Component
export class FilmsUrlComponent implements IComponent
{
  public _filmList = new FilmsListComponent();
  private _filmContentComponent = new FilmsContentComponent();

  public onInit(): void
  {
    document.getElementById('url-films').addEventListener('change', this.handleChange);
  }

  private handleChange = () =>
  {
    const link = document.getElementById('url-films')['value'];
    this._filmContentComponent.showFilmByLink(link);
  };

  private handleSubmit = (formValues: object) =>
  {
    const video: IFilmsModel = {
      link: formValues['url'],
      name: formValues['name'],
    };

    this._filmList.add(video);
    this.resetForm();
  };

  private resetForm(): void
  {
    document.getElementById('url-films')['value'] = '';
    document.getElementById('url-name')['value'] = '';
  }

  public template(): string
  {
    const content = ` <form>
                         <div class="flex">  
                            <div class="col-3">
                              <input class="effect-7" id="url-films" type="text" name="url" placeholder="Url films.." required pattern="${Patterns.FilmUrl}" >
                                  <span class="focus-border">
                                    <i></i>
                                  </span>
                            </div>
                         </div>
                         <div class="flex">  
                              <div class="col-3">
                                  <input class="effect-7" id="url-name"  type="text" name="name" placeholder="Films name.." required pattern="${Patterns.Name}">
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
                         </div>         
                      </form>
                   `;
    return formContent(content, this.handleSubmit);
  }
}