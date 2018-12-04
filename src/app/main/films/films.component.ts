import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { FilmsUrlComponent } from './films-url.component';
import { FilmsContentComponent } from './films-content.component';
import { FilmsListComponent } from './films-list.component';

@Component
export class FilmsComponent implements IComponent
{
  private _urlComponent = new FilmsUrlComponent();
  private _filmsContentComponent = new FilmsContentComponent();
  private _filmsListComponent = new FilmsListComponent();

  public onInit(): void
  {
    document.getElementById('url-root').innerHTML += this._urlComponent.template();
    document.getElementById('films-root').innerHTML += this._filmsContentComponent.template();
    document.getElementById('films-root').innerHTML += this._filmsListComponent.template();
  }

  public template(): string
  {
    return `
            <div class="film-header">Films</div>
            <div class="film-data">
                <div id="url-root" class="url-root"></div>          
                <div id="films-root" class="films-root"></div>     
            </div>
           `;
  }
}
