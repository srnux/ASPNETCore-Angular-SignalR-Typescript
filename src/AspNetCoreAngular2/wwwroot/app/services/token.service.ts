import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../shared/app.constants';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenService {

    constructor(private _storageService: StorageService) { }

    public isAuthenticated = (): Boolean => {

        if (!this._storageService.getItem('token')) {
            return false;
        }

        return this._storageService.getItem('token') !== '';
    };

    public getDataFromToken = (token: any) => {
        var data: any = {};
        if (typeof token !== 'undefined') {
            var encoded: string = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    };

    private urlBase64Decode(str: string): string {
        var output: string = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        return window.atob(output);
    }
}