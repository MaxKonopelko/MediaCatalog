import { IComponent } from '../../types';

export class ImagesComponent implements IComponent
{
  public init(): string
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