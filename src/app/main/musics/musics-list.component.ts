import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';

@Component
export class MusicsListComponent implements IComponent
{
  public template(): string
  {
      return ` 
                  <div class="music-list">
                        <ul class="music-ul" id="music-ul">
                              <li id="music-li" class="music-li" data-id=>1</li>
                              <li id="music-li" class="music-li" data-id=>2</li>  
                         </ul>
                  </div>
              `;
  }
}
