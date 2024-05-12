import React from 'react'
import Link from 'next/link'
import { getFilmsCard } from '@/app/lib/data'
import Card from '../ui/Card'

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
              <Card
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

