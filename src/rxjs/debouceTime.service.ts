import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

const inputObservable = fromEvent(document, 'keyup');

inputObservable
  .pipe(
    /*
     * debounceTime emits the last emitted value from the source 
     * after a pause, based on a duration you specify.
     * For instance, in this case when the user starts typing all values
     * will be ignored until they paused for at least 200ms,
     * at which point the last value will be emitted.
     */
    debounceTime(200),
    map((event: any) => event?.target?.value),
    /* 
     * If the user types, then backspaces quickly, the same value could
     * be emitted twice in a row. Using distinctUntilChanged will prevent
     * this from happening.
     */
    distinctUntilChanged()
  )
