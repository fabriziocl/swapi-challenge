import React from "react";
import Link from "next/link";
import Image from "next/image";
import charImg from '../../../public/charDetail.jpg'
import { getAllCharacters, checkData } from "../lib/data";

interface Character{
    id: number,
    name: string,
    trimmedUrl: number,
    eye_color: string,
    gender: string,
}
//agregar paginado y filtros
export default async function Characters() {
    const characters = await getAllCharacters()
    
    return (
        <section>
            {characters?.map((c: Character, index: any) => {
                return (
                    <div key={index}>
                        <Image
                        src={charImg}
                        alt="generic character image"
                        width={200}
                        />
                        <Link
                            href={`/characters/${c.trimmedUrl}`}
                        >{c.name}
                        </Link>
                        {checkData(c.eye_color) && <p>Eye color: {c.eye_color}</p>}
                        {checkData(c.gender) && <p>Gender: {c.gender}</p>}
                    </div>
                )
            })}
        </section>
    )
}