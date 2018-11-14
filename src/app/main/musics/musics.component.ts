import { IComponent } from '../../types';

export class MusicsComponent implements IComponent
{
  public template(): string
  {
    return `
            <div class="music-header">Music</div>
            <div class="music-data">
                <div class="music-list">
                    <div class="track-list">1</div>
                    <div class="track-list">2</div>
                    <div class="track-list">3</div>
                    <div class="track-list">4</div>
                    <div class="track-list">5</div>
                    <div class="track-list">6</div>
                    <div class="track-list">7</div>
                </div>
                <div class="music-content">
                    <div class="music-image">
                        <img src="images/guf.jpg">
                    </div>
                    <div class="music-author">Name : Guf</div>
                    <div class="music-name">Track name : Azino777</div>
                    <div class="music-play">
                        <audio controls>
                            <source type="audio/mpeg" src="images/142.mp3">
                        </audio>
                    </div>

                </div>
            </div>
    `;
  }
}