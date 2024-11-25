import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mensagem } from 'src/app/models/mensagem.model';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-exibir-full',
  templateUrl: './exibir-full.component.html',
  styleUrls: ['./exibir-full.component.css']
})
export class ExibirFullComponent {

  mensagens: Mensagem[] = [];
  indiceAtual: number = 0;
  intervalo: any;

  constructor(private mensagemService: MensagemService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.mensagemService.listarMensagens().subscribe(mensagens => {
      this.mensagens = mensagens;
    });

    this.iniciarAvancoAutomatico();
    this.openSnackBar('Para uma melhor experiencia clica em F11');
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarAvancoAutomatico(): void {
    this.intervalo = setInterval(() => {
      this.indiceAtual = (this.indiceAtual + 1) % this.mensagens.length;
      const carrossel = document.querySelector('#mensagensCarousel') as HTMLElement;
      if (carrossel) {
        const evento = new Event('next');
        carrossel.dispatchEvent(evento);
      }
    }, 10000);
  }

  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, '', {
      duration: 3000,
      panelClass: ["custom-style"],
    });
  }
}
