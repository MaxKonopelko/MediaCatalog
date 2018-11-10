import { IComponent } from '../types';

export class AuthComponent implements IComponent
{
  public template(): string
  {
    return `    
                <!-- Login form -->
                <form id="login">
                  <div class="alert error">Invalid username or password!</div>
                  <fieldset>
                    <input name="email" placeholder="Username" type="email" /><i class="fa fa-user"></i>
                  </fieldset>
                  <fieldset>
                    <input name="password" placeholder="Password" type="password" /><i class="fa fa-lock"></i>
                  </fieldset>
                    <fieldset class="f-left">
                        <input checked="checked" class="rememberMeCheck" name="RememberMe" id="RememberMe" type="checkbox" value="1" />
                        <label for="RememberMe">Remember me</label>
                    </fieldset>
                    <input class="f-right" name="Login" type="submit" value="Login" />
                </form>
            `;
  }
}