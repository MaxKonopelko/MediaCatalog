import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';

@Component
export class ImagesContentComponent implements IComponent
{
  public template(): string
  {
    return `
              <div class="photo-root">  
                     <div class="photo">
                        <div class="photo-size">                                       
                            <img class="image" id="image" src="http://placehold.it/200x200">
                        </div>
                     </div>
              </div>
    `;
  }
}