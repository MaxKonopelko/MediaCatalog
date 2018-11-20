import { Component } from '../../../libreris/component';
import { IComponent } from '../../types';

@Component
export class MusicsUrlComponent implements IComponent
{
  public template(): string
  {
    return ` 
                      <div class="form-url">
                          <form id="form-image" class="form">
                                <div class="col-3">
                                <input class="effect-7" id="url-photo" type="text" placeholder="Url music..">
                                    <span class="focus-border">
                                      <i></i>
                                    </span>
                                </div>
                                <div class="col-3">
                                    <input class="effect-7" id="url-name"  type="text" placeholder="Music name..">
                                      <span class="focus-border">
                                        <i></i>
                                      </span>
                                </div>
                                <div class="col-3">
                                    <input class="effect-7" id="url-author"  type="text" placeholder="Author name..">
                                      <span class="focus-border">
                                        <i></i>
                                      </span>
                                </div>
                                <div class="col-3">
                                  <input class="effect-7" id="submit" type="submit" value="Save">
                                    <span class="focus-border">
                                      <i></i>
                                    </span>
                                </div>
                          </form>
                      </div>`;
  }
}
