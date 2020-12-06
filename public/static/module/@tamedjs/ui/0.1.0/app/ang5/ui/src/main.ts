import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Router } from '@angular/router';
import singleSpaAngular, { getSingleSpaExtraProviders } from 'single-spa-angular';
​import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { HostAppClient } from './host-app-client/HostAppClient';

if (environment.production) {
  enableProdMode ();
}

if ((window as any).__POWERED_BY_QIANKUN__) {
  const lifecycles = singleSpaAngular ({
    bootstrapFunction: (singleSpaProps) => {
      singleSpaPropsSubject.next (singleSpaProps);
      return platformBrowserDynamic (getSingleSpaExtraProviders ()).bootstrapModule (AppModule);
    },
    template: '<app-trg-ui-ang5></app-trg-ui-ang5>',
    Router,
    NgZone,
  });
  
  const { bootstrap, mount, unmount } = lifecycles;
  HostAppClient.register({
  name: '@tamedjs/trg-ui-ang5',
    bootstrap,
    mount: (args) => {
      let id;
  
      id = HostAppClient.kebabAppName ({ id: '@tamedjs/trg-ui-ang5' });
      (mount as any) (args);
      HostAppClient.show ({ id });
  
      return Promise.resolve ();
    },
    unmount
  });
}
else {
  platformBrowserDynamic ()
    .bootstrapModule (AppModule)
    .catch (err => console.error (err));
}
