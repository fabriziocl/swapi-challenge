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
    <section className="min-h-screen">
      <h1 className='text-2xl sm:text-5xl lg:text-6xl mb-4 text-center text-[#ADB7BE]'>List of Star Wars movies: </h1>
      <div className='flex flex-wrap gap-10 justify-evenly'>
        {films?.map((f: Film) => {
          return (
            <div
              key={f.id}
              className='bg-[#ff212e] rounded-md border-4 border-[#822b30] mx-6'
            >
              <Link href={`/films/${f.id}`}>
                <FilmCard
                  cardKey={f.id}
                  title={f.filmName}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

