import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fixes Leaflet's default marker icons not loading correctly under Vite's bundler —
// without this, pins render broken/invisible. This runs once when the module loads.
delete L.Icon.Default.prototype._get_iconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

//Glasgow's coordinates are acting as the baseline center
function SpotsMap({ spots, center = [55.8642, -4.2518], zoom = 12 }) {

    // filter spots to only ones with real lat/long
    const filteredSpots = spots.filter(spot => spot.latitude != null && spot.longitude != null)

    return(
        <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} className="rounded-xl">
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* map over the filtered spots, rendering a marker per spot, with Popup inside showing name/category */}
            {filteredSpots.map(spot => (
                <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
                    <Popup>
                        {spot.name}
                        <br />
                        {spot.category}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default SpotsMap;