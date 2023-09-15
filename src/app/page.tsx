import React, { useEffect } from 'react';
import { useObservable, users } from '@/rxjs/mySubscription.service';

export default function Home() {

  useEffect(() => {
    const mySubscription = useObservable((subscriber) => {
      subscriber.next(users);
    });

    return () => {
      mySubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Learning RxJS Basics</h1>
    </div>
  )
}
