import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import SpotCard from "../components/SpotCard";

function MySpotsPage() {
    const { user, spots } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState("");

    const mySpots = spots.filter(spot => spot.ownerId === user.id);

    const filteredSpots = mySpots.filter(spot => {
        const term = searchTerm.toLowerCase();

        return spot.name.toLowerCase().includes(term) || spot.vibeTags.some(tag => tag.toLowerCase().includes(term));
    });

    //group filtered spots by category 
    const groupedSpots = filteredSpots.reduce((groups, spot) => {
        const category = spot.category;

        if(!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(spot);

        return groups;
    }, {});

    return (
        <div className="mt-8 mx-30">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full bg-paper mb-6"
            />

            {/* grouped spots */}
            {Object.entries(groupedSpots).map(([category, categorySpots]) =>
                <div key={category} className="mb-8">
                    <h2 className="font-display text-rosewood mb-2">{category}</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {categorySpots.slice(0,4).map(spot => (
                            <div key={spot.id} className="shrink-0 w-70">
                                <SpotCard spot={spot} />
                            </div>
                        ))}
                    </div>
                    <button className="text-rosewood text-sm mt-1">View All</button>
                </div>
            )}
        </div>
    )

}
export default MySpotsPage;