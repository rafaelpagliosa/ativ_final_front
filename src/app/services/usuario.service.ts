import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, { nome, email, senha });
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }
}
