import { Component } from '../../../libreris/component';

@Component
export class MusicsContentComponent
{
  public template(): string
  {
    return `
                  <div class="music-content">
                      <div class="music-block"
                          <div class="music-image"><img src="images/guf.jpg">
                          <div class="music-author">Name : Guf</div>
                          <div class="music-name">Track name : Azino777</div>
                          <div class="music-play">
                              <audio controls>
                                  <source type="audio/mpeg" src="https://cs9-8v4.vkuseraudio.net/p2/9004a79e477150.mp3">
                              </audio>
                          </div>
                       </div>
                    </div>
                  </div> `;
  }
}