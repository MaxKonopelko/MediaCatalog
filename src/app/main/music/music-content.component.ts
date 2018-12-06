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
    document.getElementById('music-image')['src'] = music.linkImage;
    console.log('music', music);
    document.getElementById('music-name').innerHTML = `Track : ${upperCase(music.name)}`;
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
    const musicList = MusicService.getList();

    return `
              <div class="music-content">
                  <div class="music-block"
                      <div class="music-image" id="music-image"><img src="${musicList[0].linkImage}">
                      <div class="music-author" id="music-author">Name: ${upperCase(musicList[0].authorFullName)}</div>
                      <div class="music-name" id="music-name">Track : ${upperCase(musicList[0].name)}</div>
                      <div class="music-play" id="music-play">
                          <audio controls>
                              <source type="audio/mpeg" id="music" src="${musicList[0].link}">
                          </audio>
                      </div>
                   </div>
                </div>
              </div> 
            `;
  }
}