import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {SecurityService} from './services/SecurityService';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['app/app.component.css']
})

@RouteConfig([
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent },
])



export class AppComponent implements OnInit {

    constructor(private _securityService: SecurityService) { }

    ngOnInit():any {
        console.log('ngOnInit _securityService.AuthorizedCallback');

        if (window.location.hash) {
            this._securityService.AuthorizedCallback();
        }
    }
}