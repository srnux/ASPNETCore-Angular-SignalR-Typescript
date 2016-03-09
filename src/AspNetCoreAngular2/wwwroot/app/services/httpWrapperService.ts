import { Injectable } from 'angular2/core';
import { Http, RequestOptionsArgs, Response, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { CONFIGURATION } from '../shared/app.constants';
import { TokenService } from '../services/TokenService';

@Injectable()
export class HttpWrapperService {
    constructor(private _http: Http, private _tokenService: TokenService) {

    }

    public get = (url: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);

        return this._http.get(url, options)
            .catch(this.handleError);
    };

    public post = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.post(url, body, options)
            .catch(this.handleError);
    };

    public put = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.put(url, body, options)
            .catch(this.handleError);
    }

    public delete = (url: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.delete(url, options)
            .catch(this.handleError);
    }

    public patch = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.patch(url, body, options)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private prepareOptions(options: RequestOptionsArgs): RequestOptionsArgs {
        let token = this._tokenService.getToken();

        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        if (token) {
            options.headers.append('Authorization', 'Bearer ' + token);
        }

        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        return options;
    }
}