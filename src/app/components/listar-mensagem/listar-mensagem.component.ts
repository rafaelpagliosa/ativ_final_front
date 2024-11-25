import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-listar-mensagem',
  templateUrl: './listar-mensagem.component.html',
  styleUrls: ['./listar-mensagem.component.css']
})
export class ListarMensagemComponent {

  mensagens: any[] = [];

  constructor(
    private mensagemService: MensagemService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarMensagens();
  }

  listarMensagens(): void {
    this.mensagemService.listarMensagens().subscribe(
      (response: any[]) => {
        this.mensagens = response;
      },
      (error) => {
        console.error('Erro ao listar mensagens:', error);
        alert('Erro ao carregar as mensagens!');
      }
    );
  }

  excluirMensagem(id: number) {
    this.mensagemService.excluirMensagemPorId(id).subscribe(
      () => {
        this._snackBar.open('Mensagem excluída com sucesso!', 'Fechar', { duration: 3000 });
      },
      error => {
        console.error('Erro ao excluir mensagem:', error);
        this._snackBar.open('Erro ao excluir a mensagem.', 'Fechar', { duration: 3000 });
      }
    );
  }
}
