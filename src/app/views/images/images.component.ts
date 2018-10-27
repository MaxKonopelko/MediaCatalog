import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';

@Component
export class ImagesComponent implements IComponent
{
  public onInit(): void
  {
    console.warn('onInit');

    document.getElementById('form-image')
      .addEventListener('submit', this.handleSubmit);
  }

  private handleSubmit(event: Event): void
  {
    event.preventDefault();
    console.warn('AAAAAA1');
  }

  public template(): string
  {
    return ` 
            <div class="photo-header">Photo</div>
            <div class="photo-data">
                <div class="url-photo">
                    <div>
                        <form id="form-image">
                              <!--<label for="fname">URL IMAGE </label>-->
                              <input type="text" id="url-photo" value="" placeholder="Url image..">
                              <input type="submit" id="submit" ">
                        </form>
                    </div>

               </div>             
                <div class="photo-content">
                     <div class="photo-list">
                           <ol class="photos" id="photos">
                                                           
                           </ol>                                                
                     </div>
                     <div class="photo">
                        <div class="photo-size">                                       
                            <img class="image" id="image" src="http://placehold.it/350x350">
                        </div>
                     </div>
                </div>
            </div>
    `;
  }
}