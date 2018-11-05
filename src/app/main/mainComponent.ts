import { IComponent } from '../types';
import { ImagesComponent } from './images/images.component';
import { Component } from '../../libreris/component';
import { FilmsComponent } from './films/films.component';
import { MusicsComponent } from './musics/musics.component';

@Component
export class MainComponent implements IComponent
{
  private _imagesComponent = new ImagesComponent();
  private _filmsComponent = new FilmsComponent();
  private _musicsComponent = new MusicsComponent();

  public onInit(): void
  {
    document.getElementById('fl1').addEventListener('click', this.handleSubmit);
    document.getElementById('fl2').addEventListener('click', this.handleSubmit);
    document.getElementById('fl3').addEventListener('click', this.handleSubmit);
  }

  private handleSubmit = () =>
  {
    document.getElementById('content').innerHTML = this._imagesComponent.template();
  };

  public template(): string
  {
    return `
            <div class="menu">
                 <div class="b1" id="fl1"><i class="fa fa-youtube-play" style="font-size:36px"></i>Фильмы</div>
                 <div class="b1" id="fl2"><i class="fa fa-music" style="font-size:36px"></i>Музыка</div>
                 <div class="b1" id="fl3"><i class="fa fa-photo" style="font-size:36px;"></i>Фото</div>
            </div>
            <div class="content" id="content"></div>`;
  }
}