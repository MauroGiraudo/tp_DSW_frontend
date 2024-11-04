import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BebidaService {

 private urlBebidas = 'http://localhost:3000/api/bebidas';
 private bebidasSubject = new BehaviorSubject<any>(null); // BehaviorSubject para almacenar las bebidas

  constructor(private http: HttpClient) { }

public getBebidas(): Observable<any> {
    // Si ya hay bebidas almacenados, devuélvelos
    if (this.bebidasSubject.value) {
      return this.bebidasSubject.asObservable();
    } else {
      // Si no, haz la solicitud HTTP
      return this.http.get<any>(this.urlBebidas).pipe(
        tap(data => {
          this.bebidasSubject.next(data); // Almacena las bebidas en el BehaviorSubject
        })
      );
    }
  }
}

