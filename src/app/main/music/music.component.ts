import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { MusicUrlComponent } from './music-url.component';
import { MusicListComponent } from './music-list.component';
import { MusicContentComponent } from './music-content.component';

@Component
export class MusicComponent implements IComponent
{
  private _urlComponent = new MusicUrlComponent();
  private _musicList = new MusicListComponent();
  private _musicContentComponent = new MusicContentComponent();

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