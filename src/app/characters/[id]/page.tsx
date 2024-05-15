import React from "react"
import Image from "next/image"
import { getCharacterDetail, checkData } from "@/app/lib/data"
import charImg from '../../../../public/charDetail.jpg'

export default async function CharacterDetail({ params }: any) {
    const charDetail = await getCharacterDetail(params.id)

    return (
        <section className="text-[#ADB7BE]">
            <div className="flex justify-center">
                <div className="flex flex-col items-center p-6 bg-[#157dfc] lg:w-1/2 md:w-3/4 sm:w-full rounded-lg shadow-md shadow-[#157dfc]">
                    <h1 className='text-2xl sm:text-5xl lg:text-6xl p-4 text-center '>{charDetail.name}</h1>
                    <Image
                        src={charImg}
                        alt="generic character image"
                        width={400}
                    />
                    <p className="p-4">Character overview: </p>
                    <ul className="list-disc">
                        {checkData(charDetail.eye_color) && <li>Eye color: {charDetail.eye_color}</li>}
                        {checkData(charDetail.birth_year) && <li>Birth year: {charDetail.birth_year}</li>}
                        {checkData(charDetail.hair_color) && <li>Hair color: {charDetail.hair_color}</li>}
                        {checkData(charDetail.height) && <li>Height: {charDetail.height}</li>}
                        {checkData(charDetail.skin_color) && <li>Skin color: {charDetail.skin_color}</li>}
                        {checkData(charDetail.mass) && <li>Mass: {charDetail.mass}</li>}
                    </ul>
                </div>
            </div>
        </section>
    )
}