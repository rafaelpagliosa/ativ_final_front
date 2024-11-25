import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from 'src/app/models/mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private apiUrl = 'http://localhost:3000/api/mensagens';

  constructor(private http: HttpClient) { }


  listarMensagens(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.apiUrl);
  }


  cadastrarMensagem(mensagem: Mensagem): Observable<Mensagem> {
    return this.http.post<Mensagem>(this.apiUrl, mensagem);
  }

  buscarMensagemPorId(id: number): Observable<Mensagem> {
    return this.http.get<Mensagem>(`${this.apiUrl}/${id}`);
  }


  atualizarMensagemPorId(id: number, mensagem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mensagem);
  }

  excluirMensagemPorId(id: number): Observable<Mensagem> {
    return this.http.patch<Mensagem>(`${this.apiUrl}/${id}`, { status: 'excluída' });
  }

}
