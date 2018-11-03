import { MainComponent } from './main/mainComponent';
import { AuthComponent } from './auth/auth.component';

export class AppComponent
{
  private _authComponent = new AuthComponent();
  private _mainComponent = new MainComponent();

  public render(): void
  {
    document.getElementById('auth-root').innerHTML = this._authComponent.template();
    document.getElementById('main-root').innerHTML = this._mainComponent.template();
  }
}