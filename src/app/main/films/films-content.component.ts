class FilmsContentComponent
{
    public template(): string
    {
      return `
                <div class= "photo-content">  
                       <div class="photo">
                          <div class="photo-size">                                       
                              <img class="image" id="image" src="${urlDefaultImage}">
                          </div>
                       </div>
                </div>
      `;
    }          
}