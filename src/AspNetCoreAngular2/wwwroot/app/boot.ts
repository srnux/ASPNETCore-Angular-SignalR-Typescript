import { bootstrap } from 'angular2/platform/browser';
import {ComponentRef, provide, enableProdMode, bind} from 'angular2/core';
import { APP_BASE_HREF, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.component';
import { SignalRService } from './services/signalR.service';
import { HttpWrapperService } from './services/httpWrapper.service';
import { TokenService } from './services/token.service';
import { StorageService } from './services/storage.service';
import { SecurityService } from './services/security.service';
import { appInjector } from './shared/app.injector';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    SignalRService,
    HttpWrapperService,
    SecurityService,
    TokenService,
    StorageService,
    // provide(LocationStrategy, {useClass: HashLocationStrategy})
    bind(LocationStrategy).toClass(HashLocationStrategy),
    provide(APP_BASE_HREF, { useValue: '/' })
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector workaround for Dependency Injection in Router lifecycle hook
    appInjector(appRef.injector);
});
