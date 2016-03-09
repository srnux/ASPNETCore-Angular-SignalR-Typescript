import { Injectable } from 'angular2/core';
import { Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { FoodItem } from '../models/FoodItem';
import { CONFIGURATION } from '../shared/app.constants';
import { HttpWrapperService } from './HttpWrapperService';

@Injectable()
export class DataService {

    private actionUrl: string;

    constructor(private _http: HttpWrapperService) {

        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foodItems/';
    }

    public GetAllFood = (): Observable<FoodItem[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleFood = (id: number): Observable<FoodItem> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public AddFood = (foodName: string): Observable<FoodItem> => {
        let toAdd: string = JSON.stringify({ ItemName: foodName });

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, foodToUpdate: FoodItem): Observable<FoodItem> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(foodToUpdate))
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public DeleteFood = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
