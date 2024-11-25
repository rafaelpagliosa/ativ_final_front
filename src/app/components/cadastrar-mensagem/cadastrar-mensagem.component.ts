import { Component } from '@angular/core';
import { MensagemService } from '../../services/mensagem.service';
import { Mensagem } from 'src/app/models/mensagem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-mensagem',
  templateUrl: './cadastrar-mensagem.component.html',
  styleUrls: ['./cadastrar-mensagem.component.css']
})
export class CadastrarMensagemComponent {

  currentUser: any;
  id: any;

  constructor(
    private mensagemService: MensagemService,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.mensagem.supervisor = this.currentUser.nome;

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    if (id) {
      this.buscarMensagem(+id);
    }
  }


  mensagem: Mensagem = {
    id: 0,
    texto: '',
    destinatario: '',
    remetente: '',
    dataCriacao: new Date(),
    supervisor: '',
    tipo: ''
  };


  buscarMensagem(id: number): void {
    this.mensagemService.buscarMensagemPorId(id).subscribe(mensagem => {
      this.mensagem = mensagem;
    });
  }


  cadastrarMensagem(): void {
    if (!this.id) {

      if (!this.mensagem.texto || !this.mensagem.destinatario || !this.mensagem.remetente) {
        alert('Preencha todos os campos obrigatórios!');
        return;
      }
      this.mensagemService.cadastrarMensagem(this.mensagem).subscribe(
        (novaMensagem) => {
          this.openSnackBar('Mensagem cadastrada com sucesso!');
          this.limparFormulario();

        },
        (erro) => {
          this.openSnackBar(`Erro ao cadastrar mensagem  ${erro}`);
          alert('Erro ao cadastrar mensagem. Tente novamente.');
        }
      );
    } else {
      this.mensagemService.atualizarMensagemPorId(this.id, this.mensagem)
        .subscribe({
          next: (response) => {
            this.openSnackBar(`Mensagem atualizada com sucesso!`);

          },
          error: (error) => {
            this.openSnackBar(`Erro ao atualizar a mensagem  ${error}`);
            console.error(error);
          }
        });
    }
  }


  limparFormulario(): void {
    this.mensagem = {
      id: 0,
      texto: '',
      destinatario: '',
      remetente: '',
      dataCriacao: new Date(),
      supervisor: '',
      tipo: ''
    };
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, '', {
      duration: 3000,
      panelClass: ["custom-style"],
    });
  }





}
