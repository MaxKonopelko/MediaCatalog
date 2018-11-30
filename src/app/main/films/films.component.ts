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
                     <div class="flex">  
                        <div class="col-3">
                          <input class="effect-7" id="url-music" type="text" placeholder="Url films.." required pattern="https?:\\/\\/.*\\.(?:mp3|mp4)" >
                              <span class="focus-border">
                                <i></i>
                              </span>
                        </div>
                     </div>
                     <div class="flex">  
                          <div class="col-3">
                              <input class="effect-7" id="url-name"  type="text" placeholder="Films name.." required pattern="[A-Za-zА-Яа-яЁё0-9]{1,15}">
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
                    </form>
                </div>          
                <div id="films-root" class="films-root">
                      <div class="films-content">
                         <div class="films-block">
                            <video controls autoplay>
                                 <source src="https://www.playground.ru/redirect/download/video/hd/2980.mp4">
                            </video>
                        </div>
                      </div> 
                      <div class="films-list">
                         <ul class="films-ul" id="films-ul">
                            <li id="music-li" class="music-li" data-id="">
                                <span id="music-span" class="music-span" >
                                 1
                                </span>
                                <i id='fa-close' class="fa fa-close" style="font-size:24px"></i>
                            </li> 
                         </ul>
                      </div>
                </div>     
            </div>
           `;
  }
}
