import React from "react";
import Link from "next/link";
import Image from "next/image";
import charImg from '../../../public/charDetail.jpg'
import { getAllCharacters, checkData } from "../lib/data";

interface Character {
    id: number,
    name: string,
    trimmedUrl: number,
    eye_color: string,
    gender: string,
}
//agregar paginado y filtros
export default async function Characters() {
    const characters = await getAllCharacters()
    console
    return (
        <section className="text-[#ADB7BE]">
            <h1 className='text-2xl sm:text-5xl lg:text-6xl mt-4 text-center text-[#ADB7BE]'>List of Star Wars characters: </h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 p-10 m-10 justify-items-stretch gap-4">
                {characters?.map((c: Character, index: any) => {
                    return (
                        <div key={index} className="bg-[#157dfc] flex flex-col items-center p-2 rounded-md">
                            <Link
                                href={`/characters/${c.trimmedUrl}`}
                            >
                                <Image
                                    src={charImg}
                                    alt="generic character image"
                                    width={200}
                                    className="rounded"
                                />
                                <p className="text-center">
                                    {c.name}
                                </p>
                            </Link>
                            {checkData(c.eye_color) && <p>Eye color: {c.eye_color}</p>}
                            {checkData(c.gender) && <p>Gender: {c.gender}</p>}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}