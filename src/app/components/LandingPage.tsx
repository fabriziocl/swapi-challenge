"use client"
import Link from "next/link";
import React from "react";
import Image from "next/image";
import films from '../../../public/ItoVIfilms.jpeg'
import characters from '../../../public/characters.jpg'

const LandingPage = () => {
  return (
    <section>
        <h1>STAR WARS API</h1>
        <p>Welcome to the Star Wars API, where you will find information about films and characters. Let’s get started!</p> 
        <div className="pt-3">
            <p>Films</p>
            <Link href="/Films">
            <Image 
            src={films}
            alt="films image"
            width="500"
            />
            </Link>
        </div>
        <div className="pt-3">
            <p>Characters</p>
            <Link href="/Characters">
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

export default LandingPage;