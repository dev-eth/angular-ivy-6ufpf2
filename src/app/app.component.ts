import { Component } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  interval,
  withLatestFrom,
  Observable,
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  timerSource: Observable<number>;
  timerLiveSubject = new BehaviorSubject<boolean>(false);
  count: number;

  constructor() {}

  ngOnInit(): void {
    this.count = 0;
    this.timerSource = interval(300).pipe(
      withLatestFrom(this.timerLiveSubject),
      filter(([v, running]) => running),
      map(() => this.count++)
    );
  }

  startReceive() {
    this.timerLiveSubject.next(true);
  }

  stopReceive() {
    this.timerLiveSubject.next(false);
  }

  resetReceive() {
    this.count = 0;
  }
}
