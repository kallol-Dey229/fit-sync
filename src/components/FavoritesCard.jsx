'use client';

import React from 'react';
import { Card, Button } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FavoritesCard = ({ favorites }) => {

    const { classId, classTitle, trainerName, image, price } = favorites || {};

    return (
        <Card className="bg-[#0b0d19] border border-[#1e2235] p-4 rounded-2xl flex flex-row items-center gap-4 max-w-2xl w-full relative group">
            
           
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={image}
                    height={100} width={100}
                    alt={classTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

           
            <div className="flex flex-col flex-1 min-w-0 justify-center">
                <Link href={`/all-classes/${classId}`}>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide hover:text-[#ff5a1f] transition-colors truncate">
                        {classTitle || "Untitled Bootcamp"}
                    </h3>
                </Link>
                
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1 truncate">
                    {trainerName || "Expert Trainer"}
                </p>

                <p className="text-lg sm:text-xl font-black text-[#ff4500] mt-3">
                    ${price || "0"}
                </p>
            </div>

            
            <Button
                
                variant="light"
                aria-label="Remove from favorites"
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 min-w-8 h-8 w-8 rounded-lg transition-colors"
            >
                <Trash2 size={18} />
            </Button>
        </Card>
    );
};

export default FavoritesCard;