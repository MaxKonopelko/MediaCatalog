import { IComponent } from '../types';
import { formContent } from '../controls/controls';

export class AuthComponent implements IComponent
{
  private handler = () =>
  {
    console.warn('HANDLER');
  };

  public template(): string
  {
    const content = `
                  <div class="alert error">Invalid username or password!</div>
                  <fieldset>
                    <input name="email" placeholder="Username" type="email" required  /><i class="fa fa-user"></i>
                  </fieldset>
                  <fieldset>
                    <input name="password" placeholder="Password" type="password" required pattern="[0-9]{6,14}"/><i class="fa fa-lock"></i>
                  </fieldset>
                    <input class="f-right" name="Login" type="submit" value="Login" />`;

    return formContent(content, this.handler);

  }
}
