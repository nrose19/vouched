import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../api/spots";

//following same as category enum in backend
const categories = ["CAFE", "RESTAURANT", "BAR", "PUB", "WINE_BAR", "SALON", "SHOP", "GYM", "GALLERY", "PARK", "MARKET", "CINEMA", "MUSIC_VENUE", "OTHER"];


//simple template for testing
function AddSpotPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "", 
    address: "", 
    category: "CAFE", 
    notes: "", 
    privacyLevel: "PRIVATE", 
    vibeTags: "", //will be stored as a raw string for now
    visited: false, //not touched by handleChange -- not MVP currently
    wantsToVisit: false, //not touched by handleChange -- not MVP currently
  })

  const [error, setError] = useState("");

  function handleChange(e){
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  }
  
  function validateForm() {
    const missing = [];
    if (!formData.name.trim()) missing.push("Name");
    if (!formData.city.trim()) missing.push("City");
    if (!formData.address.trim()) missing.push("Address");
    return missing;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const missingFields = validateForm();
    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    const tagsArray = formData.vibeTags.split(',').map(tag => tag.trim());
    const payload = { ...formData, vibeTags: tagsArray };

    try {
      const response = await createSpot(payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Failure to add spot.");
    }
  }

  return(
    <div className="p-8">
      <h1 className="text-5xl">Find a cool spot?</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border rounded-lg px-3 py-2" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border rounded-lg px-3 py-2" />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border rounded-lg px-3 py-2" />
        
        {/* category dropdown menu needed */}
        <label>
          Category:
          <br/>
          <select name="category" value={formData.category} onChange={handleChange} className="border rounded-lg px-3 py-2">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        {/* visited or wants to visit */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="visited"
            checked={formData.visited}
            onChange={(e) => setFormData(prev => ({ ...prev, visited: e.target.checked, wantsToVisit: false }))}
          />
          Visited
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="wantsToVisit"
            checked={formData.wantsToVisit}
            onChange={(e) => setFormData(prev => ({ ...prev, wantsToVisit: e.target.checked, visited: false }))}
          />
          Wants to visit
        </label>

        {/* text box for notes instead of a singular line */}
        <label>
          Notes:
          <br/>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} cols={40} className="border rounded-lg px-3 py-2" />
        </label>
        
        <input name="vibeTags" placeholder="What are the vibes? (comma, separated)" value={formData.vibeTags} onChange={handleChange} className="border rounded-lg px-3 py-2" />
        

        {/* privacy level selection (two options) */}
        <fieldset>
          Privacy level: 
          <br/>
          <label className="py-2">
            <input type="radio" name="privacyLevel" value="PRIVATE" checked={formData.privacyLevel === 'PRIVATE'} onChange={handleChange}/>PRIVATE
          </label>
          <label className="px-3">
            <input type="radio" name="privacyLevel" value="FRIENDS" checked={formData.privacyLevel === 'FRIENDS'} onChange={handleChange}/>FRIENDS
          </label>
        </fieldset>
        

        {error && <p className="text-brick text-sm">{error}</p>}

        <button type="submit" className="font-display bg-rosewood text-paper-light rounded-lg py-2">
          Save spot
        </button>
      </form>
    </div>
  )
  
}
export default AddSpotPage;