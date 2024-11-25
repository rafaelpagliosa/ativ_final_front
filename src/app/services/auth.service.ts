import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, senha }).pipe(
      tap(response => {
        const loginTime = new Date().getTime();
        const currentUser = {
          nome: response.nome,
          email: response.email,
          token: response.token,
          loginTime: loginTime
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Salva no localStorage
      })
    );
  }

  // Função para verificar se o usuário está logado e se a sessão expirou
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);

      const currentTime = new Date().getTime();
      const sessionExpired = currentTime - parsedUser.loginTime > 3600000; // 1 hora em milissegundos

      if (sessionExpired) {
        // Se a sessão expirou, remove o usuário do localStorage
        this.removeCurrentUser();
        return null;
      }

      return parsedUser; // Retorna o usuário se a sessão não expirou
    }

    return null; // Se não houver um usuário logado
  }

  // Função para remover o usuário do localStorage (logout)
  removeCurrentUser() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
