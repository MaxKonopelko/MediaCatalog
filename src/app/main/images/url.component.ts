export class UrlComponent
{
  public template(): string
  {
    return `
               <div class="url-photo">
                    <div>
                        <form id="form-image">
                              <!--<label for="fname">URL IMAGE </label>-->
                              <input type="text" id="url-photo" value="" placeholder="Url image..">
                              <input type="submit" id="submit" ">
                        </form>
                    </div>
               </div>    
    `;
  }
}