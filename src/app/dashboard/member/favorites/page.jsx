import FavoritesCard from "@/components/FavoritesCard";
import { getFavorites } from "@/lib/api/classes";
import { getUserSession } from "@/lib/core/session";


const FavoritesPage = async () => {
    const user = await getUserSession();
    const userId = user.id; 
    const response = await getFavorites(userId);
    const favoritesList = response?.data || [];
    
    return (
        <div className="space-y-8 mt-5 md:mt-10">
            <h1 className="text-2xl font-black uppercase text-white sm:text-3xl">
                My Favorites
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favoritesList.map((favorites) => (
                    <FavoritesCard favorites={favorites} key={favorites._id} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;