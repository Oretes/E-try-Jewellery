import { Component, OnInit,Input,Output, ViewChild, ElementRef, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { SessionService } from '../services/session.service';//add on 09.01.20
import {PaymentServiceService} from '../services/payment-service.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SessionService,PaymentServiceService]
})
export class HomeComponent implements OnInit {

  constructor(analytics: AngularFireAnalytics,private session:SessionService,public winRef:PaymentServiceService) {
    analytics.logEvent('user_load');  //adding  private session:SessionService  on 09.01.20
  }


  canvasWidth: number;
  canvasHeight: number;
  activateCanvas = false;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  newImage: string;
  type: string;
  pair: boolean;
  category: string;
  changesMade:number;
  @ViewChild('canvasdiv', {static: false}) divToMeasureElement: ElementRef;

  sendLink(child) {
   this.newImage = child[0];
   this.type = child[1];
   this.pair = child[2];
   this.category= child[3];
   this.changesMade = this.changesMade+1;
  }



  ngOnInit() {
    this.canvasHeight = window.innerHeight;
    this.canvasWidth  = (window.innerWidth * 67) / 100;
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.canvasWidth = this.divToMeasureElement.nativeElement.offsetWidth;
      this.canvasHeight = window.innerHeight;
    });
    this.changesMade = 0;
    //add on 09.01.20
    localStorage.setItem('lastAction', Date.now().toString());
    //till
  }


  // isDisplay = true;
  // toggleDisplay() {
  //   this.isDisplay = !this.isDisplay;
  // }



}


