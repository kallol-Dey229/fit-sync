'use client'

import { useState } from "react";
import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { addToFavorites } from "@/lib/actions/classes";
import toast from "react-hot-toast";

const FavoritesButton = ({ classes, user }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

   
    const isNotMember = !user || user.role !== "member";

    const handleFavorites = async () => {
        if (!user) {
            toast.error("Please log in to add favorites");
            return;
        }

        if (user.role !== "member") {
            toast.error("Only members can add classes to favorites");
            return;
        }

        setIsSubmitting(true);

        const data = {
            classId: classes._id || classes.id, 
            userId: user.id || user._id, 
            classTitle: classes.title,
            trainerName: classes.trainerName,
            image: classes.image,
            price: classes.price,
            createdAt: new Date(),
        };

        try {
            const result = await addToFavorites(data);

            if (result.success) {
                toast.success("Added to favorites");
            } else {
                toast.error(result.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            toast.error("Something went wrong. Try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <Button
            onClick={handleFavorites}
            
            isDisabled={isSubmitting || isNotMember} 
            variant={(isSubmitting || isNotMember) ? "solid" : "bordered"} 
            className={`w-full font-bold text-xs h-11 rounded-xl transition-all duration-300 ${
                (isSubmitting || isNotMember)
                    ? "bg-zinc-950 border-zinc-900 text-zinc-600 cursor-not-allowed opacity-60" 
                    : "border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-900/20"
            }`}
        >
            <Heart 
                size={14} 
                className={`mr-1 transition-colors ${
                    isSubmitting 
                        ? "text-red-500 fill-red-500" 
                        : isNotMember 
                            ? "text-zinc-600" 
                            : "text-red-500/70"
                }`} 
            />
            
            {isNotMember 
                ? "Members Only" 
                : isSubmitting 
                    ? "Added to Favorites" 
                    : "Add to Favorites"
            }
        </Button>
    );
};

export default FavoritesButton;