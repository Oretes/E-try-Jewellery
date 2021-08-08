import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
const MINUTES_UNITL_AUTO_LOGOUT = 60 // in mins
// const CHECK_INTERVAL = 1 // in ms

const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    console.log('object created');
    this.check();
    this.initInterval();
  }
  // reset() {
  //   this.setLastAction(Date.now());
  // }

  initInterval() {
    setInterval(() => {
      this.check();
    });
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      localStorage.clear();
      alert("Time Up!");
      this.router.navigate(['']);
    }
  }
}



