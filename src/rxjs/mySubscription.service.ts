/*
 * This code demonstrates the use of RxJS operators to process data.
 * It creates an observable, applies operators, and subscribes to it.
 */

import {
  Observable,
  Observer,
  Subscriber,
  Subscription,
  TeardownLogic,
} from "rxjs";
import { map } from "rxjs/operators";

/*
 * Ingredients
 */
export const users = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 32,
    },
    {
      status: "inactive",
      age: 53,
    },
    {
      status: "active",
      age: 17,
    },
    {
      status: "inactive",
      age: 11,
    },
    {
      status: "inactive",
      age: 32,
    },
    {
      status: "inactive",
      age: 43,
    },
    {
      status: "active",
      age: 23,
    },
  ],
};

export const users2 = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "active",
      age: 17,
    },
  ]
}

export const useObservable = (
  subscriber:
    | ((this: Observable<any>, subscriber: Subscriber<any>) => TeardownLogic)
    | undefined
) => {
  /*
   * Receives the ingredients from the subscriber
   */

  const observable: Observable<any> = new Observable(subscriber);

  /*
   * Operators operating ingredients inside the pipe
   */

  const observableWithOperators = observable.pipe(
    map((value) => {
      alert("1) Got data from observable");
      return value.data;
    }),
    map((value) => {
      alert("2) Got data from first operator");
      return value.filter((user: any) => user.status === "active");
    }),
    map((value) => {
      alert("3) Got data from second operator");
      return (
        value.reduce((sum: number, user: any) => sum + user.age, 0)
      ) / value.length;
    }),
    map((value) => {
      alert("4) Got data from third operator");
      if (value < 18) throw new Error("Average is too young");
      else return value;
    })
  );

  /*
   * Display the final product
   */
  const observer: Observer<any> = {
    next: (value: any) => {
      console.log("value: ", JSON.stringify(value));
      console.log("Observer got a value of " + value);
    },
    error: (err: any) => {
      console.log("Observer got an error of " + err);
    },
    complete: () => {
      console.log("Observer got a complete notification");
    },
  };

  /*
   * Subscribe the observable
   */

  const subscription = observableWithOperators.subscribe(observer);

  return subscription;
};
