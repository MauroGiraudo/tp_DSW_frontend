import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private urlPlatos = 'http://localhost:3000/api/platos'

  constructor(private http: HttpClient) { }

  public getPlatos(): Observable<any> {
    return this.http.get<any>(this.urlPlatos)
  }
}
