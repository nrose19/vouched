import SpotsMap from "../components/SpotsMap";
import { useOutletContext } from "react-router-dom";


function MapViewPage() {
    const { user, spots } = useOutletContext();


    //my spots
    const mySpots = spots.filter(spot => spot.ownerId === user.id);

    return(
        <div className="h-screen">
            <SpotsMap spots={mySpots} />
        </div>
    )
}

export default MapViewPage;