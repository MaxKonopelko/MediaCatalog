import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicService } from '../../../services/music.service';
import { upperCase } from '../../../libreris/common';

@Component
export class MusicsContentComponent implements IComponent
{
  public showMusicById(id: number): void
  {
    const music = MusicService.getId(id);
    document.getElementById('music')['src'] = music.link;
    document.getElementById('music-author').innerHTML = `Name : ${upperCase(music.authorFullName)}`;
    document.getElementById('music-name').innerHTML = `Track : ${upperCase(music.name)}`;
    this.showMusicByLink(music.link);
  }

  public showMusicByLink(link: string): void
  {
    const audio = document.getElementById('music-play');
    audio.innerHTML = `
                       <audio controls autoplay loop>
                         <source type="audio" id="music" src="${link}">
                       </audio>
                     `;
  }

  public clear(): void
  {
    document.getElementById('music')['src'] = '';
  }

  public template(): string
  {
    return `
              <div class="music-content">
                  <div class="music-block"
                      <div class="music-image" id="music-image"><img src="images/guf.jpg">
                      <div class="music-author" id="music-author"></div>
                      <div class="music-name" id="music-name"></div>
                      <div class="music-play" id="music-play">
                          <audio controls autoplay loop>
                              <source type="audio" id="music" src="">
                          </audio>
                      </div>
                   </div>
                </div>
              </div> 
            `;
  }
}