'use client';
import { useState } from 'react';
import Autocomplete from '@/components/autocomplete/Autocomplete';
import styles from './page.module.css';

async function getData(filter: string) {
  const res = await fetch(`/api/movies?filter=${filter}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.movies;
}

export default function Home() {
  const [value, setValue] = useState('');
  return (
    <main className={styles.main}>
      <Autocomplete
        placeholder="Autocomplete"
        getAsyncData={getData}
        renderItem={(movie) => movie.label}
        onChange={(movie) => setValue(movie)}
      />
      <div>Selected: {value}</div>
    </main>
  );
}
