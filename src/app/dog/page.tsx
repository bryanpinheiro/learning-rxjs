'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { useObservable } from '@/rxjs/httpPolling.service';

export default function DogPage() {
  const [status, setStatus] = useState("Stopped");
  const [image, setImage] = useState("");

  const {
    startPolling,
    stopPolling,
    isPolling,
  } = useObservable(setStatus, setImage);

  return (
    <div>
      <h1>Learning RxJS Basics</h1>
      <p>
        Start polling to request random
        <a href='https://random.dog'>
          dog
        </a>
        images!
      </p>
      <p>Polling Status: {status}</p>
      <button onClick={startPolling}>Start Polling</button>
      <button onClick={stopPolling}>Stop Polling</button>
      <Image alt="Dog!" src={image} width={400} height={400} />
    </div>
  )
}
