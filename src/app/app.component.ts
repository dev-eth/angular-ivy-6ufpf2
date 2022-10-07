import { Component } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  interval,
  withLatestFrom,
  Observable,
  switchMap,
  of,
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timerSource$: Observable<number>;
  isTimerLive$ = new BehaviorSubject<boolean>(false);
  isReset$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    let count = 0;
    this.timerSource$ = interval(300).pipe(
      withLatestFrom(this.isReset$),
      withLatestFrom(this.isTimerLive$),
      filter(([[_v, isReset], isLive]) => isReset || isLive),
      map(([[_v, isReset]]) => (isReset ? (count = 0) : count++))
    );
  }

  startReceive() {
    this.isTimerLive$.next(true);
    this.isReset$.next(false);
  }

  stopReceive() {
    this.isTimerLive$.next(false);
  }

  resetReceive() {
    this.isReset$.next(true);
  }
}
