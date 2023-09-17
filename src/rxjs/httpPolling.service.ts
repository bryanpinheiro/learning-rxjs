import { Observable, Observer, Subscriber, TeardownLogic, timer  } from "rxjs";
import { finalize, switchMap, tap } from 'rxjs/operators';

const getRandomDogImageUrl = () => {
  return fetch('https://random.dog/woof.json')
    .then(response => response.json());
}

export const useObservable = (
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  setImage: React.Dispatch<React.SetStateAction<string>>,
) => {
  let isPolling = false;
  let timerSubscription: any;

  const startPolling = () => {
    isPolling = true;
    timerSubscription = timer(0, 5000)
      .pipe(
        tap(() => {
          setStatus('Active');
        }),
        switchMap(() => getRandomDogImageUrl()),
        finalize(() => {
          setStatus('Stopped');
        }),
      )
      .subscribe(data => {
        console.log("data: ", data);
        setImage(data.url);
      });
  };

  const stopPolling = () => {
    if (timerSubscription && !timerSubscription.closed) {
      timerSubscription.unsubscribe();
    }
    setStatus('Stopped');
    isPolling = false;
  };

  return {
    startPolling, stopPolling, isPolling,
  };
};
