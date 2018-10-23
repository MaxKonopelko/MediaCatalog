import { BooksComponent } from './views/books.component';
import { MusicsComponent } from './views/musics.component';
import { FilmsComponent } from './views/films.component';

export class AppComponent
{
  private booksComponent = new BooksComponent();
  private musicsComponent = new MusicsComponent();
  private filmsComponent = new FilmsComponent();
  private components = [this.booksComponent, this.musicsComponent, this.filmsComponent];

  public init(index: number): void
  {
    document.getElementById('content').innerHTML = this.components[index].init();
  }
}

const component = new AppComponent();
const buttons = document.getElementsByClassName('b1');

for (let i = 0; i < buttons.length; i++)
{
  buttons[i].addEventListener('click', () =>
  {
    component.init(i);
  });
}