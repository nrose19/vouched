import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SpotsMap from "./SpotsMap";

function SpotCard({spot}){
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const privacyColors = {
        PRIVATE: "bg-stone",
        FRIENDS: "bg-moss",
    };

    const isOwner = spot.ownerId === user.id;

    return(
        <>
        {/* modal closed view of spot card */}
            <div 
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer"
            >
                <div className="bg-rosewood rounded-xl p-4 mb-3 h-64 flex flex-col overflow-hidden">
                    <h2 className="font-logo text-center text-3xl">{spot.name}</h2>
                    <h3 className="mt-1 text-center">{spot.category}</h3>
                    <p className="mt-2 line-clamp-3">
                        {spot.notes}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-5">
                        {spot.vibeTags.map(tag => (
                            <span key={tag} className="bg-sage text-ink text-sm px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        {/* modal open view of spot card */}
            {isModalOpen && (
                <div 
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 bg-ink/50 flex items-center justify-center z-[9999]"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} className="bg-paper-light rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between text-sm mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${privacyColors[spot.privacyLevel]}`}>{spot.privacyLevel}</span>
                            {isOwner && <button className="text-rosewood font-display">update spot</button>}
                        </div>

                        <h1 className="font-logo text-center text-5xl text-rosewood">{spot.name}</h1>
                        <p className="text-center font-display text-stone mb-4">{spot.category}</p>

                        {/* has the spot been visited or not? */}
                        <div className="flex gap-6 mb-4 mt-10 font-sans text-sm">
                            <span className="flex items-center gap-2">
                                <span className={`w-4 h-4 border rounded ${spot.isVisited ? "bg-rosewood" : "bg-transparent"}`} />
                                Visited
                            </span>
                            <span className="flex items-center gap-2">
                                <span className={`w-4 h-4 border rounded ${spot.isWantsToVisit ? "bg-rosewood" : "bg-transparent"}`} />
                                Wants to visit
                            </span>
                        </div>

                        {/* further spot information */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="font-display text-rosewood text-sm">Address</p>
                                <p className="mb-3">{spot.address}</p>

                                <p className="font-display text-rosewood text-sm">Saved by</p>
                                <p className="mb-3">{isOwner ? "Me" : "Friend"}</p>

                                <p className="font-display text-rosewood text-sm">Notes</p>
                                <p className="mb-3">{spot.notes}</p>

                                <p className="font-display text-rosewood text-sm mb-1">Vibe Tags</p>
                                <div className="flex flex-wrap gap-1">
                                {spot.vibeTags.map(tag => (
                                    <span key={tag} className="bg-sage text-ink text-xs px-2 py-1 rounded-full">{tag}</span>
                                ))}
                                </div>
                            </div>
                       

                            {/* location of spot + pictures of spot (future development) */}
                            <div className="-mt-8 flex flex-col gap-3">
                                <div className="h-60 max-w-none">
                                    <SpotsMap spots={[spot]} center={[spot.latitude, spot.longitude]} zoom={15} />
                                </div>
                                <div className="h-20 bg-paper rounded-xl flex items-center justify-center text-stone font-sans">
                                    Pictures
                                </div>
                            </div>
                        </div> 
                    </div>
        
                </div>
            )}

        </>

    )
}

export default SpotCard;