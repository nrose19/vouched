import SpotsMap from "../components/SpotsMap";
import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import FilterSidebar from "../components/FilterSideBar";
import { toggleInSet } from "../utils/toggleInSet";
import { filterSpots } from "../utils/filterSpots";

function MapViewPage() {
    const { user, spots, following } = useOutletContext();

    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedPrivacy, setSelectedPrivacy] = useState(new Set());
    const [selectedStatus, setSelectedStatus] = useState(new Set());
    const [savedByFilter, setSavedByFilter] = useState("all"); //all, friends, or me -- further development (filter by specific friend)

    const friendIds = new Set(following.map(f => f.friendUserId));
    const categories = ["CAFE", "RESTAURANT", "BAR", "PUB", "SALON", "SHOP", "GYM", "GALLERY", "PARK", "MARKET", "CINEMA", "MUSIC_VENUE", "OTHER"];

    const filteredSpots = filterSpots(spots, {
        selectedCategories,
        selectedPrivacy,
        savedByFilter,
        selectedStatus,
        userId: user.id,
        friendIds,
    });

    return (
        <div>
            <NavLink to="/profile/" className="flex justify-end mb-2 pr-6 text-sm">Back to Profile</NavLink>
            <div className="grid grid-cols-[0.1fr_1fr] gap-4 max-h-185">
                {/* filtering sidebar*/}
                <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onToggleCategory={(category) => toggleInSet(setSelectedCategories, category)}
                    selectedPrivacy={selectedPrivacy}
                    onTogglePrivacy={(level) => toggleInSet(setSelectedPrivacy, level)}
                    savedByFilter={savedByFilter}
                    onSavedByChange={setSavedByFilter}
                    selectedStatus={selectedStatus}
                    onToggleStatus={(status) => toggleInSet(setSelectedStatus, status)}
                />
                
                <SpotsMap spots={filteredSpots} />
            </div>
            
        </div>
    );
}

export default MapViewPage;