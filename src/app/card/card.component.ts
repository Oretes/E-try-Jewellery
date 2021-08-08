import { Component, OnInit,EventEmitter, HostListener, Output, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // private width: number;
  // private height: number;

  // @HostListener('window:resize', [$event])
  // onResize(event?: Event){
  //   const win = !!event ? (event.target as window) : window;
  //   this.width = win.innerWidth;
  //   this.height = win.innerHeight;
  // }

  // constructor() {
  //   this.onResize();
  // }

  ngOnInit() {
  }

  // isDisplay = true;
  // toggleDisplay() {
  //   this.isDisplay = !this.isDisplay;
  // }
}
