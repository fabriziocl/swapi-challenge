"use client"
import React from 'react';
import Image from "next/image";
import episodes from '../../../public/episodes.jpg'

interface CardProps {
    title: string;
    cardKey: number
}

const Card: React.FC<CardProps> = ({ title, cardKey }) => {
    return (
        <div>
            <Image
                src={episodes}
                alt="episodes generic image"
                width={400}
            />
            <p className="font-normal text-gray-700 dark:text-gray-400">Episode {cardKey}</p>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h4>
        </div>
    );
};

export default Card;