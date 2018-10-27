import { IComponent } from '../../types';

export class FilmsComponent implements IComponent
{
  public template(): string
  {
    return `
        <div class="film-header">Films</div>
        <div class="film-data"></div>
    `;
  }
}
