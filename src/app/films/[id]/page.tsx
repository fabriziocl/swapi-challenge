import React from "react";
import Link from 'next/link'
import Image from "next/image";
import episodes from '../../../../public/episodes.jpg'
import characters from '../../../../public/charDetail.jpg'
import { getFilmsDetail } from "@/app/lib/data";

export default async function FilmDetail({params}: any) {
    const filmDetail = await getFilmsDetail(params.id)
    // console.log(filmDetail)

    return (
        <article>
            <h2>Episode {filmDetail.episode_id}: {filmDetail.filmName}</h2>
            <Image 
                src={episodes}
                alt="generic movie image"
                width={700}
            />
            <h4>Directed by {filmDetail.director}</h4>
            {filmDetail.characters?.map((c: any, index) => {
                return (
                    <div key={index}>
                    <Image 
                    src={characters}
                    alt="generic characters image"
                    width={200}
                    />
                    <Link
                    href={`/characters/${c.characterNumber}`}
                    >{c.name}
                    </Link>
                    </div>
                )
            }
            )}
        </article>
    )
}