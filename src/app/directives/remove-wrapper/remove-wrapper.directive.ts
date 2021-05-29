import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[remove-wrapper]'
})
export class RemoveWrapperDirective {

  constructor(private elementRef: ElementRef) {
    const parentElement = this.elementRef.nativeElement.parentElement;
    const element = this.elementRef.nativeElement;

    console.log('parent element', parentElement);
    console.log('element', element);

    parentElement.removeChild(element);
    parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
    parentElement.parentNode.removeChild(parentElement);
  }
}
