import React from 'react'
import Link from 'next/link'
import { getFilmsCard } from '@/app/lib/data'
import FilmCard from '../ui/FilmCard'

interface Film {
  filmName: string;
  id: number;
}

export default async function Films() {
  const films = await getFilmsCard()
 
  return (
    <section>
      {films?.map((f: Film) => {
        return (
          <div key={f.id}>
            <Link href={`/films/${f.id}`}>
              <FilmCard
                cardKey={f.id}
                title={f.filmName}
              />
            </Link>
          </div>
        )
      })}
    </section>
  )
}

