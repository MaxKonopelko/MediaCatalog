import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicListComponent } from './music-list.component';
import { MusicContentComponent } from './music-content.component';
import { formContent } from '../../controls/controls';
import { Patterns } from '../../../libreris/common';
import { IMusicModel } from '../../../models/models';

@Component
export class MusicUrlComponent implements IComponent
{
  public _musicList = new MusicListComponent();
  private _musicContentComponent = new MusicContentComponent();

  public onInit(): void
  {
    document.getElementById('url-music').addEventListener('change', this.handleChange);
  }

  private handleChange = () =>
  {
    //const linkImage = document.getElementById('url-music-image')['value'];
    const linkMusic = document.getElementById('url-music')['value'];
    this._musicContentComponent.showMusicByLink(linkMusic);
  };

  private handleSubmit = (event: Event) =>
  {
    const music: IMusicModel = {
      link: document.getElementById('url-music')['value'],
      linkImage: document.getElementById('url-music-image')['value'],
      name: document.getElementById('url-name')['value'],
      authorFullName: document.getElementById('url-author')['value'],
    };

    this._musicList.add(music);
    this.resetForm();
  };

  private resetForm(): void
  {
    document.getElementById('url-music')['value'] = '';
    document.getElementById('url-music-image')['value'] = '';
    document.getElementById('url-name')['value'] = '';
    document.getElementById('url-author')['value'] = '';
  }

  public template(): string
  {
    const content = ` <div class="flex">                         
                        <div class="col-3">
                            <input class="effect-7" id="url-music" type="text" placeholder="Url music.." required pattern="${Patterns.MusicUrl}" >
                            <span class="focus-border">
                              <i></i>
                            </span>
                        </div>
                      </div>
                      <div class="flex">  
                        <div class="col-3">
                            <input class="effect-7" id="url-music-image" type="text" placeholder="Url music.." required pattern="${Patterns.ImageUrl}" >
                            <span class="focus-border">
                              <i></i>
                            </span>
                        </div>
                      </div>
                      <div class="flex">  
                        <div class="col-3">
                            <input class="effect-7" id="url-author"  type="text" placeholder="Author name.." required pattern="${Patterns.Name}">
                              <span class="focus-border">
                                <i></i>
                              </span>
                        </div>
                        <div class="col-3">
                            <input class="effect-7" id="url-name"  type="text" placeholder="Music name.." required pattern="${Patterns.Name}">
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
                   `;

    return formContent(content, this.handleSubmit);
  }
}