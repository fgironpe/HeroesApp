import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {
  constructor(public ref: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    if (event !== null && event.target !== undefined) {
      this.ref.nativeElement.value = (event.target as HTMLInputElement).value.toUpperCase();
    }
  }
}