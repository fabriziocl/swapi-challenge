"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import charImg from '../../../public/charDetail.jpg'
import { getAllCharacters, checkData, getFilterData } from "../lib/data";

interface Character {
    id: number,
    name: string,
    trimmedUrl: number,
    eye_color: string,
    gender: string,
}

export default function Characters() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedEyeColor, setSelectedEyeColor] = useState<string>("")
    const [selectedGender, setSelectedGender] = useState<string>("")
    const [eyeColors, setEyeColors] = useState<string[]>([])
    const [genders, setGenders] = useState<string[]>([])

    useEffect(() => {
        async function getData() {
            try {
                const [fetchedCharacters, filterData] = await Promise.all([
                    getAllCharacters(),
                    getFilterData()
                ])
                setCharacters(fetchedCharacters)
                setEyeColors(filterData.uniqueEyeColors)
                setGenders(filterData.uniqueGenders)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching characters: ', error)
            }
        }
        getData()
    }, [])

    const handleEyeColorChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEyeColor(ev.target.value)
    };

    const handleGenderChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(ev.target.value)
    };

    const filteredCharacters = characters?.filter((character: Character) => {
        if (selectedEyeColor && character.eye_color !== selectedEyeColor) {
            return false
        }
        if (selectedGender && character.gender !== selectedGender) {
            return false
        }
        return true
    })


    console.log(filteredCharacters)
    return (
        <section className="text-[#ADB7BE]">
            <h1 className='text-2xl sm:text-5xl lg:text-6xl m-4 text-center text-[#ADB7BE]'>List of Star Wars characters: </h1>
            {loading ? (
                <div className="text-center mt-8">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        <select
                            value={selectedEyeColor}
                            onChange={handleEyeColorChange}
                            className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
                        >
                            <option value="">All Eye Colors</option>
                            {eyeColors.map((color, index) => (
                                <option key={index} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedGender}
                            onChange={handleGenderChange}
                            className="px-2 py-1 border border-gray-300 rounded-md"
                        >
                            <option value="">All Genders</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 p-10 m-10 justify-items-stretch gap-4">
                        {filteredCharacters.length === 0 && (
                            <div className="text-center mt-8">
                                <p>No characters found.</p>
                            </div>
                        )}
                        {filteredCharacters.map((c: Character, index: number) => (
                            <div key={index} className="bg-[#157dfc] flex flex-col items-center p-2 rounded-md">
                                <Link href={`/characters/${c.trimmedUrl}`}>
                                    <Image
                                        src={charImg}
                                        alt="generic character image"
                                        width={200}
                                        className="rounded"
                                    />
                                </Link>
                                <p className="text-center">{c.name}</p>
                                {checkData(c.eye_color) && <p>Eye color: {c.eye_color}</p>}
                                {checkData(c.gender) && <p>Gender: {c.gender}</p>}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}