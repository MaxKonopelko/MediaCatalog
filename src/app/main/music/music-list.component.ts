import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicService } from '../../../services/music.service';
import { MusicContentComponent } from './music-content.component';
import { upperCase } from '../../../libreris/common';
import { IMusicModel } from '../../../models/models';

@Component
export class MusicListComponent implements IComponent
{
  private _musicsContentComponent = new MusicContentComponent();
  private activeId: number;
  private buffer: number;

  public onInit(): void
  {
    this.refresh();
  }

  public add(music: IMusicModel): void
  {
    MusicService.add(music);
    this.refresh();
    this.activeId = this.buffer;
    this.activateElement();
  }

  private refresh(): void
  {
    const music = MusicService.getList();
    const musicUl = document.getElementById('music-ul');
    let str = '';

    music.forEach(music =>
    {
      this.buffer = music.id;
      str += `
              <li id="music-li" class="music-li" data-id=${music.id}>
                <span id="music-span" class="music-span" >
                   ${music.id}. ${upperCase(music.authorFullName)} - ${music.name}
                </span>
                <i id='fa-close' class="fa fa-close" style="font-size:24px"></i>
              </li> 
             `;
    });
    musicUl.innerHTML = str;

    this.addSpanClickHandler(musicUl);
    this.addIClickHandler(musicUl);
  }

  private addSpanClickHandler = (musicUl: HTMLElement) =>
  {
    const spanCollection = musicUl.querySelectorAll('span');
    const listArray = Array.from(spanCollection);

    listArray.forEach(spanElement =>
    {
      spanElement.addEventListener('click', () =>
      {
        const parent = spanElement.parentElement;
        const id = parseInt(parent.dataset.id);
        this.activeId = id;
        this._musicsContentComponent.showMusicById(id);
        this.refresh();
        this.activateElement();
      });
    });
  };

  public activateElement = () =>
  {
    const liCollection = document.querySelectorAll('.music-ul li');
    const listLi = Array.from(liCollection);
    const liElem = listLi.find(le => parseInt(le.getAttribute('data-id')) === this.activeId);
    liElem.classList.add('newSpan');
  };

  public addIClickHandler = (musicUl: HTMLElement) =>
  {
    const ICollection = musicUl.querySelectorAll('i');
    const listArray = Array.from(ICollection);

    listArray.forEach(iElement =>
    {
      iElement.addEventListener('click', () =>
      {
        const parent = iElement.parentElement;
        const id = parseInt(parent.dataset.id);
        MusicService.removeById(id);
        this.refresh();
        this._musicsContentComponent.clear();
      });
    });
  };

  public template(): string
  {
    return ` 
            <div class="music-list">
                  <ul class="music-ul" id="music-ul"></ul>
            </div>
           `;
  }
}
