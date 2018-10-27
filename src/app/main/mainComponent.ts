import { IComponent } from '../types';
import { Component } from '../../libreris/component';

@Component
export class MainComponent implements IComponent
{
  public template(): string
  {
    return `
            <div class="menu">
            <div class="b1" id="fl3"><i class="fa fa-photo" style="font-size:36px;"></i>Фото</div>
            <div class="b1" id="fl2"><i class="fa fa-music" style="font-size:36px"></i>Музыка</div>
            <div class="b1" id="fl1"><i class="fa fa-youtube-play" style="font-size:36px"></i>Фильмы</div>
            </div>
            <div class="content" id="content"></div>
            `;
  }
}