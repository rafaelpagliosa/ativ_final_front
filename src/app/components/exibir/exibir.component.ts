import { Component, OnInit, OnDestroy } from '@angular/core';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Mensagem } from 'src/app/models/mensagem.model';

@Component({
  selector: 'app-exibir',
  templateUrl: './exibir.component.html',
  styleUrls: ['./exibir.component.css']
})
export class ExibirComponent implements OnInit, OnDestroy {

  mensagens: Mensagem[] = [];
  indiceAtual: number = 0;
  intervalo: any;

  constructor(private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.mensagemService.listarMensagens().subscribe(mensagens => {
      this.mensagens = mensagens;
    });


    this.iniciarAvancoAutomatico();
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
}
