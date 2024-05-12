import Link from "next/link";
import React from "react";
import Image from "next/image";
import films from '../../../public/ItoVIfilms.jpeg'
import characters from '../../../public/characters.jpg'

export default async function LandingPage() {
  return (
    <section>
      <h1>STAR WARS API challenge app</h1>
      <h5>Welcome to the Star Wars API, where you will find information about films and characters. Let’s get started!</h5>
      {/* convertir en array y mandar a /lib */}
      <div className="pt-3">
        <p>Films</p>
        <Link href="/films">
          <Image
            src={films}
            alt="films image"
            width="500"
          />
        </Link>
      </div>
      <div className="pt-3">
        <p>Characters</p>
        <Link href="/characters">
          <Image
            src={characters}
            alt="characters image"
            width="500"
          />
        </Link>
      </div>
    </section>
  )
}
;