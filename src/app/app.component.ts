import { ImagesComponent } from './views/images/images.component';
import { MusicsComponent } from './views/musics/musics.component';
import { FilmsComponent } from './views/films/films.component';

export class AppComponent
{
  private imagesComponent = new ImagesComponent();
  private musicsComponent = new MusicsComponent();
  private filmsComponent = new FilmsComponent();
  private components = [this.imagesComponent, this.musicsComponent, this.filmsComponent];

  constructor()
  {
    const buttons = document.getElementsByClassName('b1');

    for (let i = 0; i < buttons.length; i++)
    {
      buttons[i].addEventListener('click', () =>
      {
        this.render(i);
      });
    }
  }

  public render(index: number): void
  {
    document.getElementById('content').innerHTML = this.components[index].template();
  }
}