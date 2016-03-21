import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { HttpWrapperService } from '../../services/httpWrapper.service';
import { SecurityService } from '../../services/security.service';
import { CONFIGURATION } from '../../shared/app.constants';

export class UserData {
    Username: string;
    Password: string;
}

@Component({
    selector: 'login-component',
    providers: [SecurityService, HttpWrapperService],
    templateUrl: 'app/components/login/login.component.html',
    directives: [CORE_DIRECTIVES]
})

export class LoginComponent {

    public userData: UserData;
    private actionUrl: string;

    constructor(private _dataService: HttpWrapperService, private _securityService: SecurityService) {
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'login/';
            this.userData = new UserData();
    }

    public login(): void {
        console.log("Do login logic");
        this._securityService.Authorize();
    }
}