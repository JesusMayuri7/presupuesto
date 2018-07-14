import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,  HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car,Trabajador} from '../interface';
//import {Trabajador} from './../interface/trabajador';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CarService {
    
    constructor(private http: HttpClient) {

    }

    
      


    postPdt(post): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

       //let params = new HttpParams();
       //params = params.append('dni', '40148011');
       
       

        //let options = new RequestOptions({ headers: myHeaders });
        return this.http.post('/api/cas/pdt_cas',post, {headers} )
        .map((response: HttpResponse<any>) => {     
            return response;
        })
        .catch(this.onError);
    }
   
    postTodo(post): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

       let params = new HttpParams();
       params = params.append('param-1', 'value-1');

        return this.http.post('api/todo',JSON.stringify(post) , {headers} )
        .map((response: HttpResponse<any>) => {     
            return <any>response;
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
             .map((response: HttpResponse<any[]>) => {     
                 return  <any>response;
             })
             .catch(this.handleError);
     }

     deleteTodo(id): Observable<any> {        
         return this.http
             .delete('http://programacion.minsa/api/todo/'+id)
             .map((response: HttpResponse<any>) => {     
                 return <any>response;
             })
             .catch(this.handleError);
     }

    getTodo(): Observable<any[]> {        
         return this.http
             .get('/api/todo')
             .map((response: HttpResponse<any[]>) => {     
                return  <any>response;
            })
             .catch(this.handleError);
     }
 
     private handleError(error: HttpResponse<any>) {
         return Observable.throw(error.statusText);
     }

    getImgTrabajador(dni) {
        return this.http.get('http://programacion.minsa/api/trabajador/'+dni)
                    .toPromise()
                    .then(res => <Car[]> res)
                    .then(data => { return data; });
    }

    getCarsSmall() {
        return this.http.get('http://programacion.minsa/api/cas/analisis')
                    .toPromise()
                    .then(res => <Car[]> res)
                    .then(data => { return data; });
    }

    getCarsMedium() {
        return this.http.get('assets/data/cars-small.json')
                    .toPromise()
                    .then(res => <any[]> res)
                    .then(data => { return data; });
    }

    getCarsLarge(page,campo,orden) {
        return this.http.get('http://programacion.minsa/api/alta_vigente/'+campo+'/'+orden+'?page='+page)
                    .toPromise()
                    .then(res => <Trabajador[]> res)
                    .then(data => { return data; });
    }
}
