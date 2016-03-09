import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { TokenService } from '../../services/TokenService';
import { HttpWrapperService } from '../../services/HttpWrapperService';
import { CONFIGURATION } from '../../shared/app.constants';

export interface IUserData {
    Username: string;
    Password: string;
}

@Component({
    selector: 'login-component',
    providers: [TokenService, HttpWrapperService],
    templateUrl: 'app/components/login/login.component.html',
    directives: [CORE_DIRECTIVES]
})

export class FoodComponent {

    public userData: IUserData;
    private actionUrl: string;

    constructor(private _dataService: HttpWrapperService) {
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'login/';
    }

    public login(): void {
        this._dataService.post(this.actionUrl, '');
    }
}