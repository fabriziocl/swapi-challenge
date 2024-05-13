import React from "react"
import Image from "next/image"
import { getCharacterDetail, checkData } from "@/app/lib/data"
import charImg from '../../../../public/charDetail.jpg'

export default async function CharacterDetail({ params }: any) {
    const charDetail = await getCharacterDetail(params.id)

    return (
        <section>
            <h1>{charDetail.name}</h1>
            <Image
                src={charImg}
                alt="generic character image"
                width={400}
            />
            {checkData(charDetail.eye_color) && <p>Eye color: {charDetail.eye_color}</p>}
            {checkData(charDetail.birth_year) && <p>Birth year: {charDetail.birth_year}</p>}
            {checkData(charDetail.hair_color) && <p>Hair color: {charDetail.hair_color}</p>}
            {checkData(charDetail.height) && <p>Height: {charDetail.height}</p>}
            {checkData(charDetail.skin_color) && <p>Skin color: {charDetail.skin_color}</p>}
            {checkData(charDetail.mass) && <p>Mass: {charDetail.mass}</p>}
        </section>
    )
}