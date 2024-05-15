import Link from "next/link";
import React from "react";
import Image from "next/image";
import films from '../../../public/ItoVIfilms.jpeg'
import characters from '../../../public/characters.jpg'

export default async function LandingPage() {
  return (
    <section className="lg:py-16">
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-[#ffeb1f] mt-4 mb-4 text-4xl sm:text-5xl lg:text-8xl font-extrabold">
          STAR WARS API challenge app
        </h1>
        <h5 className='text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6 mt-4'>
          Welcome to the Star Wars API, where you will find information about films and characters. Let’s get started!
        </h5>
      </div>
      {/* convertir en array y mandar a /lib */}
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 mt-10'>
        <div className='bg-[#ff212e] rounded-md lg:col-start-2 sm:w-full lg:col-span-5 place-self-center text-center justify-center p-3 my-2 shadow-md shadow-[#ff212e]'>
          <p className='text-[#ADB7BE] text-base sm:text-lg lg:text-xl m-4 font-bold'>Films</p>
          <Link
           href="/films"
           className="flex justify-center items-center"
           >
            <Image
              className="rounded"
              src={films}
              alt="films image"
              height="300"
              objectFit="cover"
            />
          </Link>
        </div>
        <div className='bg-[#157dfc] rounded-md lg:col-start-7 sm:w-full lg:col-span-5 place-self-center text-center justify-center p-3 my-2 shadow-md shadow-[#157dfc]'>
          <p className='text-[#ADB7BE] text-base sm:text-lg lg:text-xl m-4 font-bold'>Characters</p>
          <Link
            href="/characters"
            className="flex justify-center items-center"
          >
            <Image
              className="rounded"
              src={characters}
              alt="characters image"
              height="300"
              objectFit="cover"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
;