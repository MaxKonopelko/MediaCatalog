import { IComponent } from '../types';

export class AuthComponent implements IComponent
{
  public template(): string
  {
    return `
                <form method="post" action="">
                <input type="text" name="login" value="" placeholder="Логин или Email"><br>
                <input type="password" name="password" value="" placeholder="Пароль"><br>
                <input type="submit" name="commit" value="Войти">
                </form>
            `;
  }
}