import { IComponent } from '../types';
import { ImagesComponent } from './images/images.component';
import { Component } from '../../libreris/component';
import { FilmsComponent } from './films/films.component';
import { MusicsComponent } from './musics/musics.component';

@Component
export class MainComponent implements IComponent
{
  private _imagesComponent = new ImagesComponent();
  private _musicsComponent = new MusicsComponent();
  private _filmsComponent = new FilmsComponent();

  public onInit(): void
  {
    this.handleSubmit(null, this._imagesComponent);

    document.getElementById('fl1').addEventListener('click', (e) => this.handleSubmit(e, this._imagesComponent));
    document.getElementById('fl2').addEventListener('click', (e) => this.handleSubmit(e, this._musicsComponent));
    document.getElementById('fl3').addEventListener('click', (e) => this.handleSubmit(e, this._filmsComponent));
  }

  private handleSubmit = (e: Event, component: IComponent) =>
  {
    document.getElementById('content').innerHTML = component.template();
  };

  public template(): string
  {
    return `
            <div class="menu">
                 <div class="b1" id="fl1"><i class="fa fa-youtube-play" style="font-size:36px"></i>Фото</div>
                 <div class="b1" id="fl2"><i class="fa fa-music" style="font-size:36px"></i>Музыка</div>
                 <div class="b1" id="fl3"><i class="fa fa-photo" style="font-size:36px;"></i>Фильмы</div>
            </div>
            <div class="content" id="content"></div>`;
  }
}