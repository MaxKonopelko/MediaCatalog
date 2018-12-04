import { IComponent } from '../../types';
import { Component } from '../../../libreris/component';
import { FilmService } from '../../../services/film.service';
import { upperCase } from '../../../libreris/common';

@Component
export class FilmsContentComponent implements IComponent
{
  public showFilmById(id: number): void
  {
    const video = FilmService.getById(id);
    document.getElementById('films-name').innerHTML = `Track : ${upperCase(video.name)}`;
    this.showFilmByLink(video.link);
  }

  public showFilmByLink(link: string): void
  {
    const video = document.getElementById('films-video');
    console.log('video', video);
    video.innerHTML = `
                        <video controls autoplay>
                           <source id="film" src="${link}">
                         </video>
                      `;
  }

  public clear(): void
  {
    document.getElementById('film')['src'] = '';
  }

  public template(): string
  {
    const filmList = FilmService.getList();

    return `
                <div class="films-content">
                   <div class="films-play" id="films-play">
                      <div class="films-name" id="films-name">Track : ${upperCase(filmList[0].name)}</div>
                      <div class="films-video" id="films-video">
                        <video controls>
                             <source id="film" src="${filmList[0].link}">
                        </video>
                      </div>
                   </div>
                </div> 
            `;
  }
}