import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicService } from '../../../services/music.service';
import { upperCase } from '../../../libreris/common';

@Component
export class MusicContentComponent implements IComponent
{
  public showMusicById(id: number): void
  {
    const music = MusicService.getById(id);
    document.getElementById('music-author').innerHTML = `Name : ${upperCase(music.authorFullName)}`;
    document.getElementById('music-name').innerHTML = `Track : ${upperCase(music.name)}`;
    document.getElementById('music-cover')['src'] = music.linkImage;
    console.log('music.linkImage', music.linkImage);
    this.showMusicByLink(music.link);
  }

  public showMusicByLink(link: string): void
  {
    const audio = document.getElementById('music-play');
    audio.innerHTML = `
                       <audio controls autoplay loop>
                         <source type="audio/mpeg" id="music" src="${link}">
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
                      <div class="music-block">
                          <div class="music-parametr" id="music-parametr">
                              <div class="music-image" id="music-image">
                                  <img class="music-cover" id="music-cover" alt="Not image" src="">
                              </div>
                              <div class="music-author" id="music-author">Name: </div>
                              <div class="music-name" id="music-name">Track : </div>
                              <div class="music-play" id="music-play">
                                  <audio controls>
                                      <source type="audio/mpeg" id="music" src="">
                                  </audio>
                              </div>
                          </div>
                    </div> 
              </div>
            `;
  }
}