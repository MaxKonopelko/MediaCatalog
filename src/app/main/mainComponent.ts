import { IComponent } from '../types';
import { ImagesComponent } from './images/images.component';
import { Component } from '../../libreris/component';
import { FilmsComponent } from './films/films.component';
import { MusicComponent } from './music/music.component';
import { Growl } from '../../libreris/growl';

@Component
export class MainComponent implements IComponent
{
  private _imagesComponent = new ImagesComponent();
  private _musicsComponent = new MusicComponent();
  private _filmsComponent = new FilmsComponent();

  public onInit(): void
  {
    this.handleSubmit(this._musicsComponent);
    document.getElementById('fl1').addEventListener('click', (e) => this.handleSubmit(this._imagesComponent));
    document.getElementById('fl2').addEventListener('click', (e) => this.handleSubmit(this._musicsComponent));
    document.getElementById('fl3').addEventListener('click', (e) => this.handleSubmit(this._filmsComponent));

    Growl.notice('1');
    Growl.warning('2');
    Growl.error('3');
    Growl.notice('4');

  }

  private handleSubmit = (component: IComponent) =>
  {
    document.getElementById('content').innerHTML = component.template();

  };

  public template(): string
  {
    return `
            <div id="buttonGrowl">Button</div>
            <div class="menu">
                 <div class="b1" id="fl1"><i class="fa fa-youtube-play" style="font-size:36px"></i>Photo</div>
                 <div class="b1" id="fl2"><i class="fa fa-music" style="font-size:36px"></i>Music</div>
                 <div class="b1" id="fl3"><i class="fa fa-photo" style="font-size:36px;"></i>Film</div>
            </div>
            <div class="content" id="content"></div>`;
  }
}