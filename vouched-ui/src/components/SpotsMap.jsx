import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapResizer from "./MapResizer";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fixes Leaflet's default marker icons not loading correctly under Vite's bundler —
// without this, pins render broken/invisible. This runs once when the module loads.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

//Glasgow's coordinates are acting as the baseline center
function SpotsMap({ spots, center = [55.8642, -4.2518], zoom = 13 }) {

    // filter spots to only ones with real lat/long
    const filteredSpots = spots.filter(spot => spot.latitude != null && spot.longitude != null)

    const categoryColors = {
        CAFE: "#AB4E68",         // rosewood
        RESTAURANT: "#BC4B51",   // brick
        BAR: "#8B3A52",          // darker rosewood
        PUB: "#D97A87",          // lighter rosewood
        SALON: "#A8BA9A",        // sage
        SHOP: "#7C9473",         // darker sage
        GYM: "#C9D6BE",          // lighter sage
        GALLERY: "#27213C",      // ink
        PARK: "#4A4468",         // lighter ink
        MARKET: "#8B8578",       // stone
        CINEMA: "#E8B4BC",       // light rosewood/pink
        MUSIC_VENUE: "#6B3540",  // dark maroon
        OTHER: "#5C5850",        // darker stone
    };

    function getCategoryIcon(category) {
        const color = categoryColors[category] || categoryColors.OTHER;
        return L.divIcon({
            className: "",
            html: `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5s12.5-19.1 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
                <circle cx="12.5" cy="12.5" r="5" fill="white"/>
            </svg>
            `,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41],
        });
    }


    return(
        <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} className="rounded-xl">
            <MapResizer />
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* map over the filtered spots, rendering a marker per spot, with Popup inside showing name/category */}
            {filteredSpots.map(spot => (
                <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={getCategoryIcon(spot.category)}>
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