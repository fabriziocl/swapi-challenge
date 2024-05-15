import React from "react";
import Link from 'next/link'
import Image from "next/image";
import episodes from '../../../../public/episodes.jpg'
import characters from '../../../../public/charDetail.jpg'
import { getFilmsDetail } from "@/app/lib/data";

export default async function FilmDetail({ params }: any) {
    const filmDetail = await getFilmsDetail(params.id)
    // console.log(filmDetail)

    return (
        <article className="min-h-screen flex justify-center items-center text-[#ADB7BE]">
            <div className="pt-9 bg-[#ff212e] lg:w-3/4 md:w-3/4 sm:w-full rounded-lg shadow-md">
                <div className="flex flex-col justify-center items-center p-6">
                    <h2 className="text-2xl sm:text-5xl lg:text-6xl p-4 text-center">Episode {filmDetail.episode_id}: {filmDetail.filmName}</h2>
                    <Image
                        src={episodes}
                        alt="generic movie image"
                        width={700}
                        className="mb-4"
                    />
                    <h4 className="mb-8">
                        Directed by {filmDetail.director}
                    </h4>
                </div>
                <p className=" text-xl font-bold text-center">
                    Characters in this movie:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 px-10 m-10 justify-items-stretch">
                    {filmDetail.characters?.map((c: any, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center p-2"
                            >
                                <Image
                                    src={characters}
                                    alt="generic characters image"
                                    width={50}
                                />
                                <Link
                                    href={`/characters/${c.characterNumber}`}
                                >
                                    {c.name}
                                </Link>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </article>
    )
}