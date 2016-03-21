import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../shared/app.constants';
import { Router } from 'angular2/router';
import { TokenService } from '../services/token.service';
import { StorageService } from '../services/storage.service';

class ReceivedTokenData {
    public token: string;
    public idToken: string;

    constructor(receivedToken: string, receivedIdToken: string) {
        this.token = receivedToken;
        this.idToken = receivedIdToken;
    }
}

@Injectable()
export class SecurityService {

    public HasAdminRole: boolean;
    private _authorizationDataToken: string = 'token';
    private _authorizationDataIdToken: string = 'idToken';
    private _hasAdminRoleIdentifier: string = 'HasAdminRole';

    constructor(
        private _router: Router,
        private _tokenService: TokenService,
        private _storageService: StorageService) {

        if (this._tokenService.isAuthenticated()) {
            this.HasAdminRole = this._storageService.getItem(this._hasAdminRoleIdentifier);
        }
    }

    public ResetAuthorizationData() {
        this._storageService.removeItem(this._authorizationDataToken);
        this._storageService.removeItem(this._authorizationDataIdToken);

        this.HasAdminRole = false;
        this._storageService.setItem(this._hasAdminRoleIdentifier, false);
    }

    public SetAuthorizationData(token: string, id_token: string) {
        this._storageService.setItem(this._authorizationDataToken, token);
        this._storageService.setItem(this._authorizationDataIdToken, id_token);

        var data: any = this._tokenService.getDataFromToken(token);

        for (var i = 0; i < data.role.length; i++) {
            if (data.role[i] === CONFIGURATION.authentication.adminRoleDescription) {
                this.HasAdminRole = true;
                this._storageService.setItem(this._hasAdminRoleIdentifier, true)
            }
        }
    }

    public Authorize() {
        this.ResetAuthorizationData();

        var nonce: string = 'N' + Math.random() + '' + Date.now();
        let state: string = Date.now() + '' + Math.random();

        this._storageService.setItem('authStateControl', state);
        this._storageService.setItem('authNonce', nonce);

        var url: string =
            CONFIGURATION.baseUrls.authorizationUrl + '?' +
            'response_type=' + encodeURI(CONFIGURATION.authentication.response_type) + '&' +
            'client_id=' + encodeURI(CONFIGURATION.authentication.clientId) + '&' +
            'redirect_uri=' + encodeURI(CONFIGURATION.baseUrls.server) + '&' +
            'scope=' + encodeURI(CONFIGURATION.authentication.scopes) + '&' +
            'nonce=' + encodeURI(nonce) + '&' +
            'state=' + encodeURI(state);

        window.location.href = url;
    }

    public AuthorizedCallback() {
        this.ResetAuthorizationData();

        var hash: string = window.location.hash.substr(1);
        var receivedData: ReceivedTokenData = this.ExtractResponseResult(hash);

        if (receivedData == null) {
            this.ResetAuthorizationData();
            this._router.navigate(['Unauthorized']);
            return;
        }

        this.SetAuthorizationData(receivedData.token, receivedData.idToken);
        this._router.navigate(['Dashboard']);
    }

    private ExtractResponseResult = (hash: string): ReceivedTokenData => {
        var result: any = hash.split('&').reduce(function(result, item) {
            var parts: string[] = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        if (result.error) {
            return null;
        }

        if (result.state !== this._storageService.getItem('authStateControl')) {
            console.log('AuthorizedCallback incorrect state');
            return null;
        }

        var token = result.access_token;
        var id_token = result.id_token

        var dataIdToken: any = this._tokenService.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this._storageService.getItem('authNonce')) {
            console.log('AuthorizedCallback incorrect nonce');
            return null;
        }

        return new ReceivedTokenData(token, id_token);
    }

    public Logoff() {
        this.ResetAuthorizationData();

        // TODO logout on IdentityServer4
    }

    public HandleError(error: any) {
        if (error.status === 403) {
            this._router.navigate(['Forbidden']);
        } else if (error.status === 401) {
            this.ResetAuthorizationData();
            this._router.navigate(['Unauthorized']);
        }
    }
}