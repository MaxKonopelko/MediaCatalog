import { IComponent } from '../types';

export function formContent(content: string, callback: Function): string
{
  const id = `form-id-${Math.random()}`;

  setTimeout(() =>
  {
    const form = document.getElementById(id);
    form.addEventListener('submit', (event: Event) =>
    {
      event.preventDefault();
      console.warn('evemt', event);

      callback();
    });
  }, 1);

  return `<form noValidate id="${id}">${content}</form>`;
}

export class AuthComponent implements IComponent
{
  private handler = () =>
  {
    console.warn('HANDLER')
  };

  public template(): string
  {
    const content = `
                  <div class="alert error">Invalid username or password!</div>
                  <fieldset>
                    <input name="email" placeholder="Username" type="email" /><i class="fa fa-user"></i>
                  </fieldset>
                  <fieldset>
                    <input name="password" placeholder="Password" type="password" /><i class="fa fa-lock"></i>
                  </fieldset>
                    <input class="f-right" name="Login" type="submit" value="Login" />`;

    return formContent(content, this.handler);
  }
}
