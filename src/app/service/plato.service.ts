import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlatoService {

 private urlPlatos = 'http://localhost:3000/api/platos';
 private platosSubject = new BehaviorSubject<any>(null); // BehaviorSubject para almacenar los platos

  constructor(private http: HttpClient) { }

  /*public getPlatos(): Observable<any> {
    return this.http.get<any>(this.urlPlatos)
  }*/

public getPlatos(): Observable<any> {
    // Si ya hay platos almacenados, devuélvelos
    if (this.platosSubject.value) {
      return this.platosSubject.asObservable();
    } else {
      // Si no, haz la solicitud HTTP
      return this.http.get<any>(this.urlPlatos).pipe(
        tap(data => {
          this.platosSubject.next(data); // Almacena los platos en el BehaviorSubject
        })
      );
    }
  }
}
