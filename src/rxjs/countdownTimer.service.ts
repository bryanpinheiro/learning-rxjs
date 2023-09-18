import { interval } from 'rxjs';
import { scan, map, tap, takeWhile, startWith } from 'rxjs/operators';

// streams
const counterObservable = interval(1000);

/*
 * Starting countdown example. In future lessons we will learn
 * about how to seed our countdown, complete when the timer hits zero, 
 * pause the countdown, and resume. More to come!
 */

// pause countdown use takeUntil

// COUNTDOWN
const COUNTDOWN_FROM = 10;

counterObservable
  .pipe(
    map(() => -1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),
    startWith(COUNTDOWN_FROM),
    tap(console.log),
    takeWhile(value => value >= 0),
  );