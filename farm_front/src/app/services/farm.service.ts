import { Injectable } from '@angular/core'
import { Farm } from './../models/Farm'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  farmUrl = `http://localhost:3000/farms`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  create(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.farmUrl, farm, this.httpOptions);
  }

  read(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.farmUrl}/${id}`, this.httpOptions);
  }

  list(): Observable<Farm[]> {
    return this.http.get(this.farmUrl, this.httpOptions).pipe(map((farms) => farms as Farm[]));
  }

  update(id: number, farm: Farm): Observable<Farm>{
    return this.http.put<Farm>(`${this.farmUrl}/${id}`, farm, this.httpOptions);
  }

  delete(id:number){
    return this.http.delete(`${this.farmUrl}/${id}`, this.httpOptions);
  }

}
