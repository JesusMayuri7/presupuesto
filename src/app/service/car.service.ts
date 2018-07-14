import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';
import { Car,Trabajador} from '../interface';
//import {Trabajador} from './../interface/trabajador';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CarService {
    
    constructor(private http: Http) {}

    postPdt(post): Observable<any> {
        let myHeaders = new Headers();
        myHeaders.append( 'Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: myHeaders });
        return this.http.post('/api/cas/pdt_cas',JSON.stringify(post) , options )
        .map((response: Response) => {     
            return <any>response.json();
        })
        .catch(this.onError);
    }
   
    postTodo(post): Observable<any> {
        let myHeaders = new Headers();
        myHeaders.append( 'Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: myHeaders });
        return this.http.post('api/todo',JSON.stringify(post) , options )
        .map((response: Response) => {     
            return <any>response.json();
        })
        .catch(this.onError);
    }

   
    private onError(error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }

    getFotoTrabajador(dni): Observable<any[]> {
        console.log('recibiendo '+dni);
         return this.http
             .get('http://programacion.minsa/api/trabajador/'+dni)
             .map((response: Response) => {     
                 return <any[]>response.json();
             })
             .catch(this.handleError);
     }

     deleteTodo(id): Observable<any> {        
         return this.http
             .delete('http://programacion.minsa/api/todo/'+id)
             .map((response: Response) => {     
                 return <any>response.json();
             })
             .catch(this.handleError);
     }

    getTodo(): Observable<any[]> {        
         return this.http
             .get('/api/todo')
             .map((response: Response) => {     
                 return <any[]>response.json();
             })
             .catch(this.handleError);
     }
 
     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }

    getImgTrabajador(dni) {
        return this.http.get('http://programacion.minsa/api/trabajador/'+dni)
                    .toPromise()
                    .then(res => <Car[]> res.json())
                    .then(data => { return data; });
    }

    getCarsSmall() {
        return this.http.get('http://programacion.minsa/api/cas/analisis')
                    .toPromise()
                    .then(res => <Car[]> res.json())
                    .then(data => { return data; });
    }

    getCarsMedium() {
        return this.http.get('assets/data/cars-small.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { return data; });
    }

    getCarsLarge(page,campo,orden) {
        return this.http.get('http://programacion.minsa/api/alta_vigente/'+campo+'/'+orden+'?page='+page)
                    .toPromise()
                    .then(res => <Trabajador[]> res.json())
                    .then(data => { return data; });
    }
}
