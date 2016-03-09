import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../shared/app.constants';

@Injectable()
export class TokenService {
    private _token: string;
    constructor() {
        this._token = '';
    }

    public getToken = () => {
        return this._token;
    };

    public setToken = (token: string) => {
        this._token = token;
    };

    public isAuthenticated = (): Boolean => {
        return this._token !== '';
    }
}