export interface Mensagem {
  id: number;
  texto: string;
  destinatario: string;
  remetente: string;
  dataCriacao: Date;
  supervisor: string;
  tipo: string;
}
