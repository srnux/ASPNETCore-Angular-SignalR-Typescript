import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { CONFIGURATION } from '../shared/app.constants';

@Injectable()
export class HttpWrapperService {
    constructor(private _http: Http) {

    }

    public Get = (url: string, options?: RequestOptionsArgs): Observable<Response> => {
        
        options = this.prepareOptions(options);

        return this._http.get(url, options)
            .map((response: Response) => <Response>response.json())
            .catch(this.handleError);
    }
    
/*    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return this._http.post(url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return this._http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return this._http.delete(url, options);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return this._http.patch(url, body, options);
    }*/
    
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private prepareOptions(options: RequestOptionsArgs): RequestOptionsArgs {
        //var token = this._tokenService.token;
        var token = "TOKEN HERE";
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