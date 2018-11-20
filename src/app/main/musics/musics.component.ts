import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { MusicsUrlComponent } from './musics-url.component';
import { MusicsListComponent } from './musics-list.component';
import { MusicsContentComponent } from './musics-content.component';

@Component
export class MusicsComponent implements IComponent
{
  private _urlComponent = new MusicsUrlComponent();
  private _musicList = new MusicsListComponent();
  private _musicContentComponent = new MusicsContentComponent();

  public onInit(): void
  {
    document.getElementById('url-root').innerHTML += this._urlComponent.template();
    document.getElementById('music-root').innerHTML += this._musicList.template();
    document.getElementById('music-root').innerHTML += this._musicContentComponent.template();
  }

  public template(): string
  {
    return `
            <div class="music-header">Music</div>
            <div class="music-data">
                <div id="url-root" class="url-root"></div>    
                <div id="music-root" class="music-root"></div>
            </div>
    `;
  }
}