import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicsListComponent } from './musics-list.component';
import { MusicsContentComponent } from './musics-content.component';

@Component
export class MusicsUrlComponent implements IComponent
{
  public _musicList = new MusicsListComponent();
  private _musicsContentComponent = new MusicsContentComponent();

  public onInit(): void
  {
    document.getElementById('url-music').addEventListener('change', this.handleChange);
    document.getElementById('form-music').addEventListener('submit', this.handleSubmit);
  }

  private handleChange = () =>
  {
    const link = document.getElementById('url-music')['value'];
    this._musicsContentComponent.showMusicByLink(link);
  };

  private handleSubmit = (event: Event) =>
  {
    event.preventDefault();
    const urlMusic = document.getElementById('url-music');

    const music = {
      link: urlMusic['value'],
      name: document.getElementById('url-name')['value'],
      authorFullName: document.getElementById('url-author')['value'],
      top: '',
    };

    this._musicList.add(music);
    this.resetForm();
  };

  public resetForm(): void
  {
    document.getElementById('url-music')['value'] = '';
    document.getElementById('url-name')['value'] = '';
    document.getElementById('url-author')['value'] = '';
  }

  public template(): string
  {
    return ` 
                      <div class="form-url">
                          <form id="form-music" class="form">
                                <div class="col-3">
                                <input class="effect-7" id="url-music" type="text" placeholder="Url music..">
                                    <span class="focus-border">
                                      <i></i>
                                    </span>
                                </div>
                                <div class="col-3">
                                    <input class="effect-7" id="url-author"  type="text" placeholder="Author name..">
                                      <span class="focus-border">
                                        <i></i>
                                      </span>
                                </div>
                                <div class="col-3">
                                    <input class="effect-7" id="url-name"  type="text" placeholder="Music name..">
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
                          </form>
                      </div>`;
  }
}
