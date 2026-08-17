
function SpotCard({spot}){
    const privacyColors = {
        PRIVATE: "bg-stone",
        FRIENDS: "bg-moss",
    }
    return(
        <div className="bg-paper rounded-xl p-4 mb-3">
            <h1 className="font-logo text-center">{spot.name}</h1>

            <h3>{spot.category}</h3>
            <ul>
                {spot.vibeTags.join(', ')}
            </ul>
            <span className={`px-2 py-1 rounded-full text-xs ${privacyColors[spot.privacyLevel]}`}>
                {spot.privacyLevel}
            </span>
        </div>
    )
}

export default SpotCard;