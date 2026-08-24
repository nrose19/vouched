import { useOutletContext } from "react-router-dom";
import { useRef } from "react";
import SpotCard from "../components/SpotCard";
import SpotsMap from "../components/SpotsMap";

function ProfileOverview() {
    const { user, spots, following } = useOutletContext();


    //my spots
    const mySpots = spots.filter(spot => spot.ownerId === user.id);
        //recent spots (up to 5)
        const myRecentSpots = [...mySpots]
            .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0,10);

    //friend spots
    const friendIds = new Set(following.map(f=> f.friendUserId));
    const friendsSpots = spots.filter(spot => friendIds.has(spot.ownerId));

        //friend recent spots
        const friendsRecentSpots = [...friendsSpots]
            .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0,10);
    
            
    //scroll feature
    const myScrollRef = useRef(null);
    const friendsScrollRef = useRef(null);

    function scrollRight(ref){
        ref.current?.scrollBy({ left: 300, behavior: "smooth"})
    }

    return(
        <div className="grid grid-cols-[1fr_1fr] gap-6 mt-20">
          <div className="h-96">
            <SpotsMap spots={myRecentSpots} />
          </div>

          <div className="flex flex-col gap-6 min-w-0 -mt-8">
            <div>
              <h2 className="font-display text-rosewood mb-2">My most recent spots:</h2>
              <div className="relative">
                <div ref={myScrollRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
                  {myRecentSpots.map(spot => (
                    <div key={spot.id} className="shrink-0 w-70">
                      <SpotCard key={spot.id} spot={spot} onDelete={(id) => setSpots(prev => prev.filter(s => s.id !== id))} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-rosewood mb-2">Friends spots:</h2>
              <div className="relative">
                <div ref={myScrollRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
                  {friendsRecentSpots.map(spot => (
                    <div key={spot.id} className="shrink-0 w-40">
                      <SpotCard key={spot.id} spot={spot} onDelete={(id) => setSpots(prev => prev.filter(s => s.id !== id))} />
                    </div>
                  ))}
                </div>    
              </div>
            </div>
          </div>
        </div>
    )
}

export default ProfileOverview;