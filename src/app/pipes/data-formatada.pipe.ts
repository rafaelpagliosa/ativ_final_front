import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatada'
})
export class DataFormatadaPipe implements PipeTransform {

  transform(data: Date | string | null, formato: string = 'dd/MM/yyyy HH:mm'): string {
    if (!data) return 'Data inválida';

    const dataObj = new Date(data);

    // Se a data não for válida
    if (isNaN(dataObj.getTime())) return 'Data inválida';

    // Formatação personalizada
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');

    if (formato === 'dd/MM/yyyy HH:mm') {
      return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    }

    // Adicione outras formatações aqui, se necessário
    return dataObj.toLocaleDateString(); // Formato padrão
  }

}
