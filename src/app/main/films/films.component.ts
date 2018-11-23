import { IComponent } from '../../types';

export class FilmsComponent implements IComponent
{
  public template(): string
  {
    return `
        <div class="film-header">Films</div>
        <div class="film-data">
            <div id="url-root" class="url-root">
                <form>
                    <div class="col-3">
                      <input class="effect-7" id="url-music" type="text" placeholder="Url music.." required pattern="https?:\\/\\/.*\\.(?:mp3|mp4)" >
                          <span class="focus-border">
                            <i></i>
                          </span>
                      </div>
                      <div class="col-3">
                          <input class="effect-7" id="url-author"  type="text" placeholder="Author name.." required pattern="[A-Za-zА-Яа-яЁё0-9]{1,15}">
                            <span class="focus-border">
                              <i></i>
                            </span>
                      </div>
                      <div class="col-3">
                          <input class="effect-7" id="url-name"  type="text" placeholder="Music name.." required pattern="[A-Za-zА-Яа-яЁё0-9]{1,15}">
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
            </div>          
            <div id="photo-root" class="photo-root"></div>     
        </div>
    `;
  }
}
