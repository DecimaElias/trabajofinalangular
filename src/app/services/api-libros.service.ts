import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { libros, recomendados } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class ApiLibrosService {

  private url = 'https://66d71002006bfbe2e64faa86.mockapi.io/api/libro';
  private link = 'https://66d71002006bfbe2e64faa86.mockapi.io/api/recomendados'

  constructor(private http: HttpClient) {}


  getAll(): Observable<libros[]> {
    return this.http.get <libros[]>(this.url);
  }

  getAlle(): Observable<recomendados[]> {
    return this.http.get <recomendados[]>(this.link);
  }

  getLibros(): Observable<any[]> { 
    return this.http.get<any[]>(this.url);
  }

  getDescripcionById(id:number): Observable<any> { 
    return this.http.get<any>(`${this.url}/${id}`);
}

createOne(newRecomendados: recomendados){
  const headers = new HttpHeaders({'Content-Type': 'application.json'})
  return this.http.post<recomendados>(this.link, newRecomendados, {headers});
}
}