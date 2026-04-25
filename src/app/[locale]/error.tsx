'use client';

import {useEffect} from 'react';

type Props = {
  error: Error & {digest?: string};
  reset(): void;
};

export default function Error({error, reset}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">Quelque chose s'est mal passé !</h2>
      <button
        className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
        onClick={() => reset()}
      >
        Réessayer
      </button>
    </div>
  );
}
