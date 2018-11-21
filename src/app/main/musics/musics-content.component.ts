import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';
import { MusicService } from '../../../services/music.service';

@Component
export class MusicsContentComponent implements IComponent
{
  public showMusicById(id: number): void
  {
    document.getElementById('music')['src'] = MusicService.getId(id).link;
    this.showMusicByLink(MusicService.getId(id).link);
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
                      <div class="music-block"
                          <div class="music-image"><img src="images/guf.jpg">
                          <div class="music-author">Name : Guf</div>
                          <div class="music-name">Track name : Azino777</div>
                          <div class="music-play" id="music-play">
                              <audio controls>
                                  <source type="audio/mpeg" id="music" src="https://cs9-8v4.vkuseraudio.net/p2/9004a79e477150.mp3">
                              </audio>
                          </div>
                       </div>
                    </div>
                  </div> 
            `;
  }
}