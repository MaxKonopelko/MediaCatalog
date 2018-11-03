export class PhotoContentComponent
{
  public template(): string
  {
    return `
            <div class="photo-content">
                     <div class="photo-list">
                           <ol class="photos" id="photos"></ol>                                                
                     </div>
                     <div class="photo">
                        <div class="photo-size">                                       
                            <img class="image" id="image" src="http://placehold.it/350x350">
                        </div>
                     </div>
            </div>`;
  }
}