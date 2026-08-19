
function SpotCard({spot}){
    const privacyColors = {
        PRIVATE: "bg-stone",
        FRIENDS: "bg-moss",
    }
    return(
        <div className="bg-rosewood rounded-xl p-4 mb-3">
            <h2 className="font-logo text-center text-2xl">{spot.name}</h2>
            <h3>{spot.category}</h3>
            <p>
                {spot.notes}
            </p>
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