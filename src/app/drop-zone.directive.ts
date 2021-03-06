import { Directive,HostListener,EventEmitter,Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  constructor() { }
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

@HostListener('drop',['$event']) onDrop($event) {
   $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false)


}
@HostListener('dragover',['$event'])

onDragOver($event){
  $event.preventDefault();
  this.hovered.emit(true);
}
}
