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
                        <form action="/action_page.php">
                              <!--<label for="fname">URL IMAGE </label>-->
                              <input type="text" id="fname" name="firstname" placeholder="Url image..">
                              <input type="submit" value="Download">
                        </form>
                    </div>

               </div>             
                <div class="photo-content">
                     <div class="photo-list">
                           <ol class="photo-">
                                <li>1</li>                            
                           </ol>                                                
                     </div>
                     <div class="photo">
                        <div class="photo-size">                      
                            <img class="image" src="images/guf.jpg">
                        </div>
                     </div>
                </div>
            </div>
    `;
  }
}