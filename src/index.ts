import { AppComponent } from './app/app.component';
import { Growl } from './libreris/growl';

Growl.init();

const appComponent = new AppComponent();
appComponent.render();