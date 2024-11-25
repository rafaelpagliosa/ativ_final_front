import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDestaque]'
})
export class DestaqueDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.transformarTextoMaiusculo();
  }

  private transformarTextoMaiusculo() {
    this.renderer.setStyle(this.el.nativeElement, 'textTransform', 'uppercase');

    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'textTransform', 'none');
    }, 150);
  }

}
